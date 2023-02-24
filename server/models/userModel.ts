import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    image: String,
    sex: String,
    birthday: Date,
  }
  // {
  //   timestamps: true,
  // }
)

const User = mongoose.model('users', userSchema)

export default User
