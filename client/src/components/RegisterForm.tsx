import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../reducers/userReducer'
import { _CONST_MALE, _CONST_FEMALE } from '../constants'
import Spinner from './Spinner'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: any) => state.isLoading)

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    image: new File([], ''),
    birthday: '',
    sex: _CONST_MALE,
    confirm_password: '',
  })

  const { name, email, password, image, sex, birthday, confirm_password } = data

  const onChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    if (password !== confirm_password) {
      alert('Пароли не совпадают!')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('image', image)
    formData.append('sex', sex)
    formData.append('birthday', birthday)

    dispatch(registerUser(formData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <form className="forms" onSubmit={onSubmit}>
      <h3>Регистрация</h3>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Введите имя"
      />
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
      <input
        type="password"
        name="confirm_password"
        value={confirm_password}
        onChange={onChange}
        placeholder="Повторите пароль"
      />

      <input type="date" value={birthday} name="birthday" onChange={onChange} />

      <select onChange={(e) => setData({ ...data, sex: e.target.value })}>
        <option>{_CONST_MALE}</option>
        <option>{_CONST_FEMALE}</option>
      </select>

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
      <button className="auth" onClick={onSubmit}>
        Зарегистрироваться
      </button>
    </form>
  )
}

export default RegisterForm
