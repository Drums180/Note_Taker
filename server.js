const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing request body
app.use(express.json());

// Serve static assets
app.use(express.static('public'));

// Route to notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Route to get all notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

// Route to add a new note
app.post('/api/notes', (req, res) => {
  // Read the existing notes from the JSON file
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));

  // Get the new note from the request body
  const newNote = req.body;

  // Generate a unique ID for the new note
  const newId = Date.now().toString();

  // Add the ID to the new note
  newNote.id = newId;

  // Add the new note to the notes array
  notes.push(newNote);

  // Write the updated notes array back to the JSON file
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));

  // Send the updated notes array back to the client
  res.json(notes);
});

// Start the server
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);

app.delete('/api/notes/:id', (req, res) => {
  // Read the existing notes from the JSON file
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));

  // Find the note with the matching ID
  const noteId = req.params.id;
  const noteIndex = notes.findIndex(note => note.id === noteId);

  // Remove the note from the notes array
  notes.splice(noteIndex, 1);

  // Write the updated notes array back to the JSON file
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));

  // Send the updated notes array back to the client
  res.json(notes);
});