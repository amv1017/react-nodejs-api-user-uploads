import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import expressAsyncHandler from 'express-async-handler'
import connectDB from './db/db'
import {
  getAllUsers,
  loginUser,
  registerUser,
} from './controller/userController'

dotenv.config({ path: '../.env' })

connectDB()

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))

const upload = multer({ dest: 'uploads/' })

app.get('/api/users', expressAsyncHandler(getAllUsers))

app.post(
  '/api/users',
  upload.single('image'),
  expressAsyncHandler(registerUser)
)

app.post('/api/login', expressAsyncHandler(loginUser))

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`)
})
