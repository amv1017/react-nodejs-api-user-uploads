import React, { useEffect, useState } from 'react'

import { IUser } from './IUser'

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:8080/users')
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
