import UserSchema from '../models/userModel'
import { generateToken } from './util'

export const getAllUsers = async (req: any, res: any) => {
  const users = await UserSchema.find({})

  const result = users.map(({ id, name, image, birthday }) => ({
    id,
    name,
    image,
    birthday,
  }))

  res.status(200).json(result)
}

export const registerUser = async (req: any, res: any) => {
  const { name, email, password, sex, birthday } = req.body
  const { path: image } = req.file

  if (!name || !email || !password || !sex || !birthday || !image) {
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
    birthday,
    sex,
  })

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      user: user.image,
      sex: user.sex,
      birthday: user.birthday,
    })
  } else {
    res.status(400)
    throw new Error('Failed to register')
  }
}

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body
  const user = await UserSchema.findOne({ email })

  if (user && password === user.password) {
    const id = user.id
    res.status(200).json({
      id,
      token: generateToken(id),
    })
  } else {
    res.status(400)
    throw new Error('Incorrect email or password')
  }
}

export const editUser = async (req: any, res: any) => {
  const id = req.params.id
  const user = await UserSchema.findById(id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  const { path: image } = req.file

  const updated = await UserSchema.findByIdAndUpdate(id, { ...req.body, image })

  if (updated) {
    res.status(200).json({
      id,
    })
  } else {
    res.status(400)
    throw new Error('User not updated')
  }
}
