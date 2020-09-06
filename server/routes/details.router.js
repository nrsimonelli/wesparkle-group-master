const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  //Will eventually have to edit this to include tags
  console.log("details get for req.params.id:", req.params.id);
  console.log("details get for req.user.id:", req.user.id);
  const query = `
  SELECT "tag"."user_id", "link_id", "long_url", "short_url", array_agg(tag_name) as tags from link_tag
FULL OUTER JOIN "tag" on "tag_id" = "tag"."id"
FULL OUTER JOIN "link" on "link"."id" = "link_tag"."link_id"
WHERE "tag"."user_id" = $2 AND "link_id" = $1
GROUP BY "link_id", "long_url", "short_url", "tag"."user_id"
;`;
  pool
    .query(query, [req.params.id, req.user.id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("Error making SELECT for details:", error);
      res.sendStatus(500);
    });
});

//PUT template, doesn't do anything yet unless we need it
router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log("PUT req.body.tags: ", req.body.tags);
  console.log("PUT req.body.details.link_id: ", req.body.details.link_id);
  console.log("PUT req.user.id: ", req.user.id);

  // const link = req.body;
  // const queryString = `UPDATE "link" SET
  //   variablething = $1 
  //   WHERE id = $3
  //   AND user_id = $4;`;

  // pool
  //   .query(queryString, [link.variablething, link.id, link.user_id])
  //   .then((result) => {
  //     // success
  //     console.log("PUT successful");
  //     res.send(result.rows);
  //   })
  //   .catch((err) => {
  //     // failure
  //     console.log("----->Error in PUT:", err);
  //     res.sendStatus(500);
  //   });
});

module.exports = router;
