import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const RegisterForm = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = data

  const onChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    dispatch(loginUser({ email, password }))
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Введите e-mail"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Введите пароль"
      />

      <button onClick={onSubmit}>Войти</button>
    </form>
  )
}

export default RegisterForm
