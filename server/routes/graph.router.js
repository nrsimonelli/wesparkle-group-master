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
    SELECT DATE(timestamp) AS x, COUNT (*) AS y
    FROM click 
    WHERE link_id = $1
    GROUP BY DATE(timestamp)
    ORDER BY x;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error making SELECT for details:", error);
      res.sendStatus(500);
    });
});



module.exports = router;
