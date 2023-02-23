import jwt from 'jsonwebtoken'

export const generateToken = (id: number) => {
  const token = jwt.sign(
    { id },
    process.env.JWT_SECRET || 'SECRET_OR_PRIVATE_KEY',
    { expiresIn: '1d' }
  )
  return token
}
