import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import expressAsyncHandler from 'express-async-handler'
import UserSchema from './models/userModel'
import connectDB from './db/db'

dotenv.config({ path: '../.env' })

connectDB()

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))

app.get(
  '/api/users',
  expressAsyncHandler(async (req, res) => {
    const users = await UserSchema.find({})
    res.status(200).json(users)
  })
)

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`)
})
