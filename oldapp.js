const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');

const getNotes = require('./notes.js');

//Customize yargs version
yargs.version(chalk.blue('Notes version: 1.1.0'))

//Command handlers
const addNote = function (argv) {
    console.log(chalk.blue(`\n\nTitle: ${argv.title.toUpperCase()}`));
    console.log(chalk.green(`\n${argv.body}\n\n`));
};

const removeNote = function() {
    console.log(chalk.blue('Removing a note'));
};

const listNotes = function() {
    console.log(chalk.blue('List out all notes'));
};

const readNote = function() {
    console.log(chalk.blue(getNotes()));
};

//Command builders
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

const noBuilder = {}

//Commands list
const commands = [
    {action: 'add', description: 'Add a new note', builder: addBuilder, handler: addNote},
    {action: 'remove', description: 'Remove a note', builder: noBuilder, handler: removeNote},
    {action: 'list', description: 'List all notes', builder: noBuilder, handler: listNotes},
    {action: 'read', description: 'Read a note', builder: noBuilder, handler: readNote}
];

//Generate all commands from the list
commands.forEach(command => {
    yargs.command(command.action, chalk.blue(command.description), command.builder, command.handler)
})

/* //Create add command
yargs.command({
    command: 'add',
    describe: chalk.blue('Add a new note'),
    builder: {
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
    },
    handler: function (argv) {
        console.log(chalk.blue(`Title: ${argv.title}`));
        console.log(chalk.green(`Title: ${argv.body}`));
    }
})
//Create remove command
yargs.command({
    command: 'remove',
    describe: chalk.blue('Remove a note'),
    handler: function () {
        console.log(chalk.blue('Removing a note'));
    }
})
//Create list command
yargs.command({
    command: 'list',
    describe: chalk.blue('List out all notes'),
    handler: function () {
        console.log(chalk.blue('Listing out all notes'));
    }
})
//Create read command
yargs.command({
    command: 'read',
    describe: chalk.blue('Read a note'),
    handler: function () {
        console.log(chalk.blue(getNotes()));
    }
}) */

yargs.parse()

//add, remove, read, list