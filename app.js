const express = require('express');
const app = express();
const path = require('path')
const api = require('./routes/api');

app.use(express.static("public"))

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use('/', api)

app.listen(3000, () => {
    console.log("server is running on port 3000 ...");
})