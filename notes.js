const fs = require('fs')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    
    const duplicatedNotes = notes.filter( e => {
        return e.title === title
    })

    if (duplicatedNotes.length === 0) {
        notes.push({
            title: title, 
            body: body
        })
        saveNotes(notes)
        console.log('New notes added!')
    } else {
        console.log('The title is already exists')
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    
    const newNotes = notes.filter( note => {
        return note.title !== title
    })

    if (JSON.stringify(newNotes) == JSON.stringify(notes)) {
        console.log('The title is unknown')
    } else {
        saveNotes(newNotes)
        console.log('Notes removed !')
    }
}

module.exports = {
    getNotes, addNote, removeNote
}