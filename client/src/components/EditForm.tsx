import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editProfile } from '../reducers/userReducer'
import { _CONST_MALE, _CONST_FEMALE } from '../constants'
import { getLocalData } from '../util'
import { useNavigate } from 'react-router-dom'

const EditForm = () => {
  const navigate = useNavigate()
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

    dispatch(
      editProfile({
        id: getLocalData().id,
        data: formData,
      })
    )
  }

  useEffect(() => {
    const localData = getLocalData()
    if (!localData) {
      navigate('/')
    }
  }, [])

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
