const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()

//create a note
router.post('/new', (request, response) => {
  const { title, content } = request.body
  const statement = `
      INSERT INTO notes (title, content, userId)
      VALUES (?, ?, ?)
    `
  db.pool.query(statement, [title, content, request.userId], (error, note) => {
    response.send(utils.createResult(error, note))
  })
})

//get all notes of user
router.get('/my', (request, response) => {
  const statement = `
          SELECT id, title, content
          FROM notes
          WHERE userId = ?
     `
  db.pool.query(statement, [request.userId], (error, notes) => {
    response.send(utils.createResult(error, notes))
  })
})

//get a note of user
router.get('/my/:id', (request, response) => {
  const { id } = request.params
  const statement = `
            SELECT id, title, content
            FROM notes
            WHERE userId = ? AND id=?
       `
  db.pool.query(statement, [request.userId, id], (error, notes) => {
    response.send(utils.createResult(error, notes))
  })
})

//edit a note of user
router.put('/edit/:id', (request, response) => {
  const { id } = request.params
  const { title, content } = request.body
  const statement = `
            UPDATE notes 
            SET title=?, content=?
            WHERE userId = ? AND id=?
       `
  db.pool.query(
    statement,
    [title, content, request.userId, id],
    (error, notes) => {
      response.send(utils.createResult(error, notes))
    }
  )
})

//delete a note of user
router.delete('/delete/:id', (request, response) => {
  const { id } = request.params
  const statement = `
              DELETE FROM notes 
              WHERE userId = ? AND id=?
         `
  db.pool.query(statement, [request.userId, id], (error, notes) => {
    response.send(utils.createResult(error, notes))
  })
})

//delete all notes of user
router.delete('/delete_all', (request, response) => {
  const statement = `
              DELETE FROM notes 
              WHERE userId = ?
         `
  db.pool.query(statement, [request.userId], (error, notes) => {
    response.send(utils.createResult(error, notes))
  })
})

module.exports = router
