import connectDB from './db/db'
import User from './models/userModel'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const data = [
  { name: 'james', email: 'james@mail.com', password: '1234' },
  { name: 'frank', email: 'frank@mail.com', password: '5678' },
  { name: 'amily', email: 'amily@mail.com', password: '90ab' },
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
