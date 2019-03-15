//imports
const fs = require('fs')
const chalk = require('chalk')

//chalk colors
const errorColor = chalk.red.bold;
const successColor = chalk.green.bold;
const systemColor = chalk.blue.bold;
const inverse = chalk.inverse.bold

//reusables
const loadnotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
};

const findNote = (notes, testTitle) => notes.find(note => note.title.toUpperCase() === testTitle.toUpperCase())

//Command Handler functions
//add
const addNote = (newTitle, newBody) => {
    const notes = loadnotes()
    const duplicateFound = findNote(notes, newTitle)

    if (duplicateFound) {
        console.log(`${errorColor('\nERROR: Title already taken')}: '${newTitle}'\n`);
    } else {
        notes.push({
            title: newTitle,
            body: newBody
        })
        saveNotes(notes);
        console.log(`${successColor('\nNew note added')}: '${newTitle}'\n`);
    }
};

//remove
const removeNote = (title) => {
    let notes = loadnotes();
    const duplicateFound = findNote(notes, title)

    if (duplicateFound) {
        notes.forEach((note, i) => {
            if (note.title.toUpperCase() === title.toUpperCase()) {
                notes.splice(i, 1)
                console.log(`\n${successColor('Note removed')}: '${note.title}'\n`);
            }
        })
    } else {
        console.log(`${errorColor(`\nERROR: Note not found`)}: '${title}'\n`);

    }
    saveNotes(notes)
}

//list
const listNotes = () => {
    const notes = loadnotes();

    if (notes.length) {
        console.log('\nYour Notes:\n');
        notes.forEach((note, i) => console.log(`${i + 1}: '${systemColor(note.title)}'\n`));
    } else {
        console.log(`${errorColor('\nNo notes found.\n')}${systemColor('\nAdd notes by typing:')} node app.js add --title="your title" --body="your text"`);
    }
}

//read
const readNote = (title) => {
    const notes = loadnotes()
    const note = findNote(notes, title)

    if (note) {
        console.log(successColor('\nNote found!'));
        console.log(`\n${inverse(note.title)}\n\n${note.body}\n`);
    } else {
        console.log(errorColor(`\nNote '${title}' not found!\n`));
        console.log(`${systemColor('List all your notes with:')} node app.js list\n`);
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};