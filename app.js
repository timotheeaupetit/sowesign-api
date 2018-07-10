const express = require('express'),
    port = process.argv[2] || 3000,
    bodyParser = require('body-parser');

const tagsRouter = require('./routes/tags');
const rdsRouter = require('./routes/rds');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure response headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/tags', tagsRouter);
app.use('/rds', rdsRouter);

// Launch server
app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}`));
