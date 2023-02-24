import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setLocalData } from '../util'
import Spinner from './Spinner'

const LoginForm = () => {
  const userData = useSelector((state: any) => state.userData)
  const isLoading = useSelector((state: any) => state.isLoading)

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  useEffect(() => {
    if (userData) {
      setLocalData(userData)
      navigate('/account')
    }
  }, [userData])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <form onSubmit={onSubmit} className="forms">
      <h3>Вход</h3>
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
      <button className="auth" onClick={onSubmit}>
        Войти
      </button>
    </form>
  )
}

export default LoginForm
