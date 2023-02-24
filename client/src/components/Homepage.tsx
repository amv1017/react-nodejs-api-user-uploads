import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import Spinner from './Spinner'
import { useEffect } from 'react'
import { getLocalData } from '../util'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()
  const isRegisterMode = useSelector((state: any) => state.isRegisterMode)
  const isLoading = useSelector((state: any) => state.isLoading)

  useEffect(() => {
    const localData = getLocalData()
    if (localData) {
      navigate('/account')
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return !isRegisterMode ? <LoginForm /> : <RegisterForm />
}

export default Homepage
