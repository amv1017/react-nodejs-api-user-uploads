import loki from 'lokijs'

const db = new loki('./db.json')

const users_data = [
  { id: 0, name: 'james', password: '1234' },
  { id: 1, name: 'frank', password: '5678' },
  { id: 2, name: 'amily', password: '90ab' },
]

const users = db.addCollection('users')

users_data.map((user) => users.insert(user))

db.saveDatabase()
