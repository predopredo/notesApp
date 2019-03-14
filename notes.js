//imports
const fs = require('fs')
const chalk = require('chalk')

//chalk colors
const errorColor = chalk.red.bold
const successColor = chalk.green.bold

const getNotes = function () {
    return 'Your notes...'
};

//reusables
const loadnotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
};

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
};

const findDuplicate = function (notes, title) {
    return notes.find(note => {
        return note.title.toUpperCase() === title.toUpperCase()
    })
}

//Command Handler functions
//add
const addNote = function (newTitle, newBody) {
    const notes = loadnotes()
    const duplicateFound = findDuplicate(notes, newTitle)
    
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
const removeNote = function (title) {
    let notes = loadnotes();
    const duplicateFound = findDuplicate(notes, title)

    if (duplicateFound) {
        notes.forEach((note, i) => {
            if (note.title.toUpperCase() === title.toUpperCase()){
                notes.splice(i, 1)
                console.log(`\n${successColor('Note removed')}: '${note.title}'\n`);
            }
        })
    } else {
        console.log(`${errorColor(`\nERROR: Note not found`)}: '${title}'\n`);
        
    }
    saveNotes(notes)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};