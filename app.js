const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');

const notes = require('./notes.js');

//Customize yargs version
yargs.version(chalk.blue('Notes version: 1.1.0'))

//Command handlers
const addHandler = function (argv) {
    notes.addNote(argv.title, argv.body)
};

const removeNote = function(argv) {
    notes.removeNote(argv.title)
};

const listNotes = function() {
    console.log(chalk.blue('\nList of all notes\n'));
};

const readNote = function() {
    console.log(chalk.blue(getNotes()));
};

//Command builders
const noBuilder = {}
//add
const addBuilder = {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string'
    }
};
//remove
const removeBuilder = {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    }
};

//Commands list
const commands = [
    {action: 'add', description: 'Add a new note', builder: addBuilder, handler: addHandler},
    {action: 'remove', description: 'Remove a note', builder: removeBuilder, handler: removeNote},
    {action: 'list', description: 'List all notes', builder: noBuilder, handler: listNotes},
    {action: 'read', description: 'Read a note', builder: noBuilder, handler: readNote}
];

//Generate all commands from the list
commands.forEach(command => {
    yargs.command(command.action, chalk.blue(command.description), command.builder, command.handler)
})

yargs.parse()