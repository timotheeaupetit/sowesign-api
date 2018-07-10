const express = require('express');
const router = express.Router();

/* GET tags. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    return res.status(200).json(["extract tags"]);
});

module.exports = router;
