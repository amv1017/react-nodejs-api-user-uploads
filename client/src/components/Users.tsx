import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../reducers/userReducer'
import { getLocalData } from '../util'
import Card from './Card'
import { IUser } from './IUser'
import Spinner from './Spinner'

const Users = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const users = useSelector((state: any) => state.users)
  const isLoading = useSelector((state: any) => state.isLoading)

  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    const localData = getLocalData()
    if (!localData) {
      navigate('/')
    } else {
      setUserId(localData?.id)
      dispatch(getUsers())
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="users">
      {(users.filter((user: IUser) => user.id !== userId) || []).map(
        (user: IUser) => (
          <div key={user.id}>
            <Card {...user} />
          </div>
        )
      )}
    </div>
  )
}

export default Users
