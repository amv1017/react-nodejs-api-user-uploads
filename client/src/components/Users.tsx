import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/userReducer'

const API_URL = import.meta.env.VITE_API_URL

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state: any) => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  if (!users) {
    return <div>No Users</div>
  }

  return (
    <ul>
      {(users || []).map((user: any) => (
        <li key={user.email}>
          {user.name}
          <img
            src={`http://localhost:8080/${user?.image}`}
            style={{ width: '100px' }}
          />
        </li>
      ))}
    </ul>
  )
}

export default Users
