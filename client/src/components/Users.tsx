import { useEffect, useState } from 'react'

import { IUser } from './IUser'

const API_URL = import.meta.env.VITE_API_URL

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL + '/users')
      const data = await res.json()
      setUsers(data)
    })()
  }, [])

  return (
    <ul>
      {users.map((user: IUser) => (
        <li>name: {user.name}</li>
      ))}
    </ul>
  )
}

export default Users
