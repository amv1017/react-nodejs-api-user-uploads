import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../reducers/userReducer'

const RegisterForm = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    image: new File([], ''),
  })

  const { name, email, password, image } = data

  const onChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('image', image)

    dispatch(registerUser(formData))
  }

  return (
    <form className="register" onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Введите имя"
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Введите e-mail"
      />
      <input
        type="text"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Введите пароль"
      />
      <input
        multiple
        onChange={(e: any) =>
          setData({
            ...data,
            image: e.target.files[0],
          })
        }
        type="file"
      />
      <button onClick={onSubmit}>Зарегистрировать</button>
    </form>
  )
}

export default RegisterForm
