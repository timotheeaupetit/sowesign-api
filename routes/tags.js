const express = require('express');
const router = express.Router();

const Scraper = require("../models/Scraper");

/**
 * Routeur pour les tags
 */
router.route('/')
    .get(function(req, res) {
        const filePath = req.query.file;
        const scraper = new Scraper();

        scraper.extractTags(filePath, function(results) {
            return res.status(200).json(results)
        });
    });

module.exports = router;
