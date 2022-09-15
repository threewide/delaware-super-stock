// import express package
const express = require('express');

// require the db.json file and assign it to the variable 'db'
const db = require('./db/db.json')
const PORT = 3001;

// initialize app variable setting it to the value of express()
const app = express();

// serves css and js files from public directory
app.use(express.static('public'));

// add a static route for index.html
app.get('/', (req, res) => {
    // send index.html file
    res.sendFile(__dirname + '/public/index.html');
});

// add a static route for notes.html
app.get('/notes', (req, res) => {
    // send notes.html file
    res.sendFile(__dirname + '/public/notes.html');
});

// GET request for notes
app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.listen(PORT, () => {
    console.log("Server is listening");
});