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
  SELECT * from link
WHERE "user_id" = $2 AND "id" = $1
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
  console.log("PUT req.body.details.id: ", req.body.details.id);
  console.log("PUT req.user.id: ", req.user.id);

  const link = req.body;
  const queryString = `UPDATE "link" SET
    tags = $1 
    WHERE id = $2
    AND user_id = $3;`;

  pool
    .query(queryString, [link.tags, link.details.id, req.user.id])
    .then((result) => {
      // success
      console.log("PUT successful");
      res.send(result.rows);
    })
    .catch((err) => {
      // failure
      console.log("----->Error in PUT:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
