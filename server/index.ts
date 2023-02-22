import express from 'express'
import cors from 'cors'
import loki from 'lokijs'

const PORT = 8080
const COLLECTION_USERS = 'users'

const app = express()

app.use(cors())
app.use(express.json())

const db = new loki('./db.json')

app.get('/users', (req, res) => {
  db.loadDatabase({}, () => {
    const users = db.getCollection(COLLECTION_USERS)
    const result = users.find({})
    res.status(200).json(result)
  })
})

app.get('/users/:id', (req, res) => {
  db.loadDatabase({}, () => {
    const users = db.getCollection(COLLECTION_USERS)
    const result = users.findOne({ id: parseInt(req.params.id) })
    res.status(200).json(result)
  })
})

app.post('/users', (req, res) => {
  db.loadDatabase({}, () => {
    const users = db.getCollection(COLLECTION_USERS)
    const id = Math.max(0, Math.max(...users.data.map(({ id }) => id))) + 1
    const user = { id, ...req.body }
    users.insert(user)
    db.saveDatabase()
    res.status(201).json(user)
  })
})

app.put('/users/:id', (req, res) => {
  db.loadDatabase({}, () => {
    const users = db.getCollection(COLLECTION_USERS)
    const result = users.findOne({ id: parseInt(req.params.id) })
    const user = { ...result, ...req.body }
    users.update(user)
    db.saveDatabase()
    res.status(200).json({ message: 'user has been updated' })
  })
})

app.delete('/users/:id', (req, res) => {
  db.loadDatabase({}, () => {
    const users = db.getCollection(COLLECTION_USERS)
    users.findAndRemove({ id: parseInt(req.params.id) })
    db.saveDatabase()
    res.status(200).json({ message: 'user has been deleted' })
  })
})

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`)
})
