const express = require('express');
const router = express.Router();

const Metadata = require("../models/Metadata");

/* GET tags. */
router.get('/', function(req, res, next) {
    const filePath = req.query.file;
    const metadata = new Metadata();
    metadata.parsePdf(filePath);
    
    return res.status(200).json(["extract tags"]);
});

module.exports = router;
