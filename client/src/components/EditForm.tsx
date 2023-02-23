import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../reducers/userReducer'
import { _CONST_MALE, _CONST_FEMALE } from '../constants'

const EditForm = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState({
    name: '',
    password: '',
    image: new File([], ''),
  })

  const { name, password, image } = data

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
    formData.append('password', password)
    formData.append('image', image)

    dispatch(registerUser(formData))
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <h1>Редактировать</h1>
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
        <button onClick={onSubmit}>Сохранить</button>
      </form>
    </>
  )
}

export default EditForm
