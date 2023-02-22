import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    image: String,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('users', userSchema)

export default User
