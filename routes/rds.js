const express = require('express');
const router = express.Router();

/* GET rds. */
router.get('/:id', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    return res.status(200).json(["get rds"])
});

module.exports = router;
