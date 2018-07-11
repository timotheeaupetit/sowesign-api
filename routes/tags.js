const express = require('express');
const router = express.Router();

const Scraper = require("../models/Scraper");

/* GET tags. */
router.route('/')
    .get(async function(req, res) {
        const filePath = req.query.file;
        const scraper = new Scraper();

        scraper.extractTags(filePath, function(results) {
            return res.status(200).json(results)
        });
    });

module.exports = router;
