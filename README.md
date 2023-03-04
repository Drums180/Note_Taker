# Note_Taker

## Criteria 1: Notes landing page presentation
This is accomplished by serving a landing page at the root URL (/) that contains a link to the notes page (/notes). Here's the code that handles this:

```
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
```

## Criteria 2: Notes page presentation
This is accomplished by serving the notes page (/notes) that contains a left-hand column displaying the list of existing notes, and a right-hand column containing empty fields to enter a new note title and text. Here's the HTML and CSS code that displays this layout:

```
<div class="container">
  <div class="row">
    <div class="col-md-4">
      <div class="list-container">
        <ul class="list-group">
          <!-- List of existing notes goes here -->
        </ul>
      </div>
    </div>
    <div class="col-md-8">
      <div class="note-container">
        <input
          class="note-title form-control"
          type="text"
          placeholder="Note Title"
        />
        <textarea
          class="note-textarea form-control"
          placeholder="Note Text"
        ></textarea>
      </div>
    </div>
  </div>
</div>

```

```
.list-container {
  margin-top: 10px;
  max-height: 450px;
  overflow-y: auto;
  border: solid 1px lightgray;
  border-radius: 3px;
}

.list-group-item {
  cursor: pointer;
}

.note-container {
  margin-top: 10px;
}
```

## Criteria 3: Note creation interface
This is accomplished by listening to the keyup event on the note title and text fields, and showing the Save icon if both fields are not empty. Here's the JavaScript code that implements this functionality:
```
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

noteTitle.addEventListener('keyup', handleRenderSaveBtn);
noteText.addEventListener('keyup', handleRenderSaveBtn);


## Criteria 4: Note save functionality
This is accomplished by sending a POST request to the server with the new note data, and then re-rendering the list of notes to include the new note. Here's the JavaScript code that implements this functionality:
```
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };

  saveNote(newNote)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch((error) => console.error(error));
};

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
```

## Criteria 5: Note display functionality
This is achieved by sending a POST request to the server with the new note data, and then re-rendering the list of notes to include the new note. Here's the JavaScript code that implements this functionality:
```
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };

  saveNote(newNote)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch((error) => console.error(error));
};

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
```
This code first creates a newNote object with the title and text entered by the user, then calls the saveNote function passing this object as an argument. The saveNote function sends a POST request to the server with the new note data and waits for a response. If the response is successful, it calls the getAndRenderNotes and renderActiveNote functions to re-render the list of notes to include the new note. If there's an error, it logs the error to the console.

## Criteria 6: Note deletion functionality
This is accomplished by sending a DELETE request to the server with the ID of the note to be deleted, and then removing the note from the list of notes. Here's the JavaScript code that implements this functionality:
```
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target.parentElement;
  const noteId = note.getAttribute('data-id');
  deleteNote(noteId)
    .then(() => {
      note.remove();
      if (activeNote.id === noteId) {
        activeNote = {};
        renderActiveNote();
      }
    })
    .catch((error) => console.error(error));
};

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

When the delete button is clicked, it calls the handleNoteDelete function. This function finds the ID of the note to be deleted, sends a DELETE request to the server with that ID, and then removes the note from the list of notes. If the deleted note was the active note, the activeNote variable is reset to an empty object, and the right-hand column is cleared.

## Criteria 7: New note creation interface
This is achieved by adding an event listener to the "Write" icon in the navigation bar that clears the active note, thus allowing the user to enter a new note title and text. Here's the JavaScript code that implements this functionality:
```
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

if (window.location.pathname === '/notes') {
  newNoteBtn.addEventListener('click', handleNewNoteView);
}
```

> Visualize the final page [here](https://drums180.github.io/Note_Taker/)
