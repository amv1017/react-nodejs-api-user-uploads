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

const upload = multer({ dest: 'uploads/' })

app.get(
  '/api/users',
  expressAsyncHandler(async (req, res) => {
    const users = await UserSchema.find({})
    res.status(200).json(users)
  })
)

app.post(
  '/api/users',
  upload.single('image'),
  expressAsyncHandler(async (req: any, res) => {
    const { name, email, password } = req.body
    const { path: image } = req.file

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('No user data')
    }

    const userExists = await UserSchema.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await UserSchema.create({
      name,
      email,
      password,
      image,
    })

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        user: user.image,
      })
    } else {
      res.status(400)
      throw new Error('User not registered')
    }
  })
)

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`)
})
