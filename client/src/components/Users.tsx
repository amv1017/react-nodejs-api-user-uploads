import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/userReducer'

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
        <li key={user.email}>{user.name}</li>
      ))}
    </ul>
  )
}

export default Users
