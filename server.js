// import express package
const express = require('express');

// import uniqid
var uniqid = require('uniqid'); 

// import fs
const fs = require('fs');

// require the db.json file and assign it to the variable 'db'
const db = require('./db/db.json')

const PORT = process.env.PORT || 3001;

// initialize app variable setting it to the value of express()
const app = express();

// Handle Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serves css and js files from public directory
app.use(express.static('public'));

// add a static route for notes.html
app.get('/notes', (req, res) => {
    // send notes.html file
    res.sendFile(__dirname + '/public/notes.html');
});

// GET request for notes
app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    // log that a POST request was received
    console.info(`${req.method} request received to add note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {

        // Variable for the object we will save
        const newNote = {
        title,
        text,
        note_id: uniqid(),
        };

        // Obtain existing reviews
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } 
            else {
            // convert string into JSON object
            const parsedNotes = JSON.parse(data);

            // Add a new review
            parsedNotes.push(newNote);

            // Write updated notes back to the file
            fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedNotes, null, 4),
                (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!')
            );
            }
        });

        const response = {
        status: 'success',
        body: newNote,
        };

        console.log(response);
        res.json(response);
    }
    else {
        res.json('Error in adding note');
    }
});

// add a static route for index.html
app.get('*', (req, res) => {
    // send index.html file
    res.sendFile(__dirname + '/public/index.html');
});

// listening on PORT
app.listen(PORT, () => {
    console.log(`API server is listening on port ${PORT}!`);
});