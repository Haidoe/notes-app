const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const notes = require("./notes");

yargs.version("2.1.2");

//Create add command
yargs.command({
    command: "add",
    describe: chalk.blue("Add a new note"),
    builder: {
        title: {
            describe: "Just put some title...",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Content of the note.",
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title, body }) {
        notes.addNote(title, body);
    }
})

yargs.command({
    command: "remove",
    describe: "Delete a note",
    builder: {
        title: {
            describe: "Title of the note to be deleted",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function ({ title }) {
        notes.deleteNote(title);
    }
})

yargs.command({
    command: "list",
    describe: chalk.red("Display list of your notes"),
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: "read",
    describe: chalk.green("Read a file, maybe?"),
    builder: {
        title: {
            describe: "Title of the note to be read",
            type: 'string',
            demandOption: true
        }
    },
    handler({ title }) {
        notes.readNotes(title)
    }
})


yargs.parse()