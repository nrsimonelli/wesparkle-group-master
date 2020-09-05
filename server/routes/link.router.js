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
  let queryString = `
  SELECT "disabled_link", "tag"."user_id", "link_id", "long_url", "short_url", array_agg(tag_name) as tags from link_tag
  FULL OUTER JOIN "tag" on "tag_id" = "tag"."id"
  FULL OUTER JOIN "link" on "link"."id" = "link_tag"."link_id"
  WHERE "tag"."user_id" = $1 AND "disabled_link" = FALSE 
  GROUP BY "disabled_link", "link_id", "long_url", "short_url", "tag"."user_id"
  ORDER BY "link_id" DESC
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
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const firstQueryString = `INSERT INTO "link" ("user_id", "long_url", "short_url")
      VALUES ($1, $2, $3) RETURNING id;`;
      const firstResult = await client.query(firstQueryString, [
        req.user.id,
        link.long_url,
        link.short_url,
      ]);

      const secondQueryString = `INSERT INTO "tag" ("user_id", "tag_name") 
      VALUES($1, 'tag example') RETURNING id;`;
      const secondResult = await client.query(secondQueryString, [req.user.id]);

      const InsertText = `INSERT INTO "link_tag" ("link_id", "tag_id") 
      VALUES($1, $2);`;
      await client.query(InsertText, [
        firstResult.rows[0].id,
        secondResult.rows[0].id,
      ]);

      console.log("successful add link!");
      await client.query("COMMIT");
      res.sendStatus(201);
      // Need transaction here to also insert into link_tag
    } catch (error) {
      await client.query("ROLLBACK");
      console.log("error with add", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
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
