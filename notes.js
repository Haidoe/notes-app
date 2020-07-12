const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync("notes.json");
        const notesJson = notesBuffer.toString();
        const notes = JSON.parse(notesJson);

        return notes;
    } catch (error) {
        return []
    }
}

const saveNotes = notes => {
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJson);
}


const getNotes = () => "Your notes madarfader..."

const addNote = (title, body) => {
    const notes = loadNotes();
    const isTitleTaken = notes.find(note => note.title === title);

    if (isTitleTaken) {
        console.log(chalk.red("Title already taken."))
    } else {
        notes.push({ title, body });
        saveNotes(notes);
        console.log(chalk.green("A note added successfully."))
    }
}

const deleteNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);

    if (notes.length === filteredNotes.length) {
        console.log(chalk.red("Note not found"));
    } else {
        saveNotes(filteredNotes);
        console.log(chalk.green("Successfully deleted the note"));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    if (notes.length) {
        console.log(chalk.blue("Your Notes:"));
        notes.forEach(note => {
            console.log(`
            Title: ${note.title},
            Body: ${note.body}
        `)
        })
    } else {
        console.log(chalk.red("You have an empty notes"))
    }
}

const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(`
            ${chalk.blue("Title:")} : ${note.title}
            ${chalk.blue("Body:")} : ${note.body}
        `)
    } else {
        console.log(chalk.red("Note not found."))
    }
}

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    listNotes,
    readNotes
}