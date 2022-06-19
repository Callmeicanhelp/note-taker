const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile)

/**
 * Given content and file path, this functions pushes the note to the database.
 * @param {object} content Note to be added to the database.
 * @param {string} file File path to write note to. 
 * @return {void} Nothing.
*/

const readAndWriteFile = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err)
        } else {
            const parsedInfo = JSON.parse(data)
            parsedInfo.push(content);
            writeToFile(file, parsedInfo)
            console.log("content")
        }
    })
}

/**
 * Search array for when object.id === note.id
 * @param {array} parsedData Array that will be searched for matching note.id
 * @param {number} noteId number pulled from object.id property
 * @return {number} index number of object with matching id property
*/

const getNoteIndex = (parsedInfo, noteId) => {
    for(let i = 0; i<parsedInfo.length; i++) {
        if (parsedInfo[i].id == noteId) {
            return i
        }
    }
}


/**
 * Searches for array object id property match and removes from array, the updates deletion to database.
 * @param {string} file The path to the file that note is being removed from 
 * @param {number} noteId number pulled from object.id property
 * @return {void} Nothing
*/

const deleteNote = (file, noteId) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err) 
        } else {
            const parsedInfo = JSON.parse(data)
            parsedInfo.splice(getNoteIndex(parsedInfo, noteId),1)
            writeToFile(file, parsedInfo)
        }
    })
}

/**
 * Converts content to string and updates database.
 * @param {string} fileName The path to the file that the content is being added to
 * @param {object} content the ojbect that will be stringified and added to the fileName
*/

function writeToFile(fileName, content) {
    fs.writeFile(fileName, JSON.stringify(content, null, 2), (err) => err ? console.error(err) : console.info(`\nData written to ${fileName}`))
}

module.exports = { readAndWriteFile, readFromFile, deleteNote }