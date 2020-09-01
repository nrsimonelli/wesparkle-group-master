const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


router.get("/", (req, res) => {
  console.log("req.user:", req.user.id);
//   Possible errors here if no user
// Maybe one route for free, another for registered/logged in?
  let queryString = `SELECT * FROM "link" WHERE user_id = $1 
    ;`;
  pool
    .query(queryString, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error making SELECT for links:", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  // didn't want to rejectUnauth here if non logged in users can add link
  console.log("req.body is:", req.body);
  const link = req.body;
  const queryString = `INSERT INTO "link" ("user_id", "long_url", "short_url")
    VALUES ($1, $2, $3);`;
  // Hopefully this will still work with no login,
  // and req.user.id will be added as NULL
  // Or possibly ignore user here and create new route for logged in POST?
  pool
    .query(queryString, [req.user.id, link.long_url, link.short_url])
    .then((result) => {
      console.log("Successful link POST add!");
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in link POST:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
