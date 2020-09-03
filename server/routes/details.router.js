const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    //Will eventually have to edit this to include tags
    console.log('details get for req.params.id:', req.params.id)
    console.log('details get for req.user.id:', req.user.id)
    const query = `SELECT * FROM link
    WHERE id = $1
    AND user_id = $2;`;
    pool.query(query, [req.params.id, req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error making SELECT for details:', error);
            res.sendStatus(500);
        });
});





module.exports = router;
