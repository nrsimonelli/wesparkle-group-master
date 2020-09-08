const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  //   Possible errors here if no user
  console.log("req.user", req.user);
  // Maybe one route for free, another for registered/logged in?
  // if (req.user != undefined) {

  let queryString = `
  SELECT * from link
  WHERE "user_id" = $1 AND "disabled_link" = FALSE 
  ORDER BY "id" DESC
  ;`;

  pool
    .query(queryString, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error making SELECT for links when logged in:", error);
      res.sendStatus(500);
    });
  //end if user is logged in
  // else {
  //   let queryString = `SELECT * FROM "link"
  //         ;`;
  //   pool
  //     .query(queryString)
  //     .then((result) => {
  //       res.send(result.rows);
  //     })
  //     .catch((error) => {
  //       console.log("Error making SELECT for links when not logged in:", error);
  //       res.sendStatus(500);
  //     });
  // }
});

// This route performs the redirection
router.get("/:short_url", (req, res) => {
  let queryString = `
    SELECT * FROM "link" WHERE short_url = '${req.params.short_url}';`;
  // This is how we get referer information:
  //let queryString2 = `INSERT INTO click (link_id, location, referral) VALUES (1, 'Namibia', '${req.headers.referer}';`;

  pool
    .query(queryString)
    .then((result) => {
      console.log(
        "in GET/:short_url - Trying to redirect to",
        result.rows[0].long_url
      );
      console.log("req.headers.referrer is", req.headers.referer);
      res.redirect(result.rows[0].long_url);
    })
    .catch((error) => {
      console.log("Error in GET/:short_url redirect. Error is", error);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log("in link router disable by id", req.params.id);
  const link_id = req.params.id;

  const queryString = `UPDATE "link" SET disabled_link = true WHERE link.id = $1;`;

  pool
    .query(queryString, [link_id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

router.post("/", async (req, res) => {
  // didn't want to rejectUnauth here if non logged in users can add link
  console.log("req.body is:", req.body);
  console.log("req.user is:", req.user);
  const link = req.body;
  // This seems like a janky workaround, but works for now
  if (req.user != undefined) {
    const queryString = `INSERT INTO "link" ("user_id", "long_url", "short_url", "tags")
    VALUES ($1, $2, $3, '{"example tag"}');`;
    pool
      .query(queryString, [req.user.id, link.long_url, link.short_url])
      .then((result) => {
        console.log("Successful link POST add!");
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("error in link POST when no user is registered:", error);
        res.sendStatus(500);
      });
  } //end if there is a user
  else {
    const queryString = `INSERT INTO "link" ("long_url", "short_url")
    VALUES ($1, $2);`;
    pool
      .query(queryString, [link.long_url, link.short_url])
      .then((result) => {
        console.log("Successful link POST add!");
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("error in link POST when no user is registered:", error);
        res.sendStatus(500);
      });
  } //end if there is NO user logged in
});

module.exports = router;
