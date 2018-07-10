const express = require('express'),
    port = process.argv[2] || 3000,
    bodyParser = require('body-parser');

const tagsRouter = require('./routes/tags');
const rdsRouter = require('./routes/rds');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/tags', tagsRouter);

app.use('/rds', rdsRouter);

// Launch server
app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}`));
