import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../reducers/userReducer'
import { getLocalData } from '../util'
import Spinner from './Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Users = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const users = useSelector((state: any) => state.users)
  const isLoading = useSelector((state: any) => state.isLoading)

  useEffect(() => {
    const localData = getLocalData()
    if (!localData) {
      navigate('/')
    } else {
      dispatch(getUsers())
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <ul>
      {(users || []).map((user: any) => (
        <li key={user.email}>
          {user.name}
          <img
            src={`${API_URL.replace('api', '')}${user.image}`}
            style={{ width: '100px' }}
          />
        </li>
      ))}
    </ul>
  )
}

export default Users
