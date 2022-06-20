const notes = require('express').Router();
const {readAndWriteFile, readFromFile, getNoteIndex} = require('../../db/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => {
        console.log(data);
        res.json(JSON.parse(data))
    })
})

notes.get('/', (req, res) => {
    getNoteIndex( './db/db.json')
    .then((data) => {
        console.log(data);
        res.json(JSON.parse(data))
    })
})

notes.post('/', (req,res) => {
    readAndWriteFile(req.body, './db/db.json')
    res.send(req.body)


})

notes.delete('/', (req, res) => {

})

module.exports = notes