const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:tags", rejectUnauthenticated, (req, res) => {
    let queryString = `
    SELECT * FROM link WHERE $1 = ANY (tags) AND user_id = $2
    AND "disabled_link" = FALSE
    ORDER BY id DESC;
  `;
    pool
      .query(queryString, [req.params.tags, req.user.id])
      .then((result) => {
        res.send(result.rows);
      }) 
      .catch((error) => {
        res.sendStatus(500);
      });
    });


module.exports = router;