import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const isRegisterMode = useSelector((state: any) => state.isRegisterMode)

  return !isRegisterMode ? <LoginForm /> : <RegisterForm />
}

export default Homepage
