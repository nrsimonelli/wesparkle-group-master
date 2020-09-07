const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  //   Possible errors here if no user
  // Maybe one route for free, another for registered/logged in?
  // if (req.user != undefined) {
  let queryString = `SELECT * FROM "link" 
    WHERE "user_id" = $1
    AND  "disabled_link" = FALSE
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
  let queryString = `SELECT * FROM "link" WHERE short_url = '${req.params.short_url}';`;
  pool
    .query(queryString)
    .then((result) => {
      console.log(
        "in GET/:short_url - Trying to redirect to",
        result.rows[0].long_url
      );
      res.redirect(result.rows[0].long_url);
    })
    .catch((error) => {
      console.log("Error in GET/:short_url redirect. Error is", error);
      res.sendStatus(500);
    });
});

// Someone has clicked the short link so let's update the metric
router.put("/:short_url", async (req, res) => {

  // AUDRY - remove
  console.log(`yo Audry. were in put count`);
  console.log(`req.body`, req.body);

  const short_url = req.params.short_url;

  // Get a single connection from the pool to do the transaction
  const connection = await pool.connect();

  try {
    // Start transaction
    await connection.query('BEGIN;');

    // Get the previous amount of clicks
    const clickCountQuery = `SELECT count FROM "link" WHERE short_url = $1;`;
    const countQueryResult = await connection.query( clickCountQuery, [short_url] );
    // AUDRY - remove
    console.log('countQueryResult: ', countQueryResult);

    // Grab the cell value
    let clickCount = countQueryResult.rows[0].count;
    // AUDRY - remove
    console.log('click count: ', clickCount);
    // A new click
    clickCount++;

    // Add the new click count to the DB
    const updateCountQuery = `UPDATE "link" SET count = $1 WHERE short_url = $2;`;
    await connection.query( updateCountQuery, [clickCount, short_url]);

    // End transaction w/ COMMIT
    await connection.query('COMMIT;')
    res.sendStatus(200);

  } catch (err) {
    console.log('Error on update click count', err);
    // Transaction failed, so end with ROLLBACK
    await connection.query('ROLLBACK');
    res.sendStatus(500);

  } finally {
    // Put the connection back in the pool to be used again later
    connection.release();
  }
})

router.put("/:id", rejectUnauthenticated, (req, res) => {
console.log("in link router disable by id", req.params.id);
const link_id = req.params.id;

const queryString = `UPDATE "link" SET disabled_link = true WHERE link.id = $1;`;

pool
  .query(queryString, [link_id])
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  // didn't want to rejectUnauth here if non logged in users can add link
  console.log("req.body is:", req.body);
  console.log("req.user is:", req.user);
  const link = req.body;
  // This seems like a janky workaround, but works for now
  if (req.user != undefined) {
    const queryString = `INSERT INTO "link" ("user_id", "long_url", "short_url")
    VALUES ($1, $2, $3);`;
    // Hopefully this will still work with no login,
    // and req.user.id will be added as NULL
    // Or possibly ignore user here and create new route for logged in POST?
    pool
      .query(queryString, [req.user.id, link.long_url, link.short_url])
      .then((result) => {
        console.log("Successful link POST add by a registered user!");
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("error in link POST:", error);
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
