import connectDB from './db/db'
import User from './models/userModel'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const data = [
  {
    name: 'James',
    email: 'james@mail.com',
    password: '1234',
    image: 'uploads\\james.jpg',
    sex: 'Мужской',
    birthday: new Date('1996-04-05'),
  },
  {
    name: 'Frank',
    email: 'frank@mail.com',
    password: '5678',
    image: 'uploads\\frank.jpg',
    sex: 'Мужской',
    birthday: new Date('1985-02-03'),
  },
  {
    name: 'Amily',
    email: 'amily@mail.com',
    password: '90ab',
    image: 'uploads\\amily.jpg',
    sex: 'Женский',
    birthday: new Date('1993-01-27'),
  },
]

const write = async () => {
  try {
    await connectDB()

    data.map((user) => {
      User.create(user)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  return new Promise(() => {
    setTimeout(() => {
      console.log('Data has been written successfully to MongoDB Database')
      process.exit(0)
    }, 1000)
  })
}

write()
