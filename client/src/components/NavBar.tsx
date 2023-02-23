import NavButton from './NavButton'
import editsvg from '../assets/edit.svg'
import userssvg from '../assets/users.svg'
import usersvg from '../assets/user.svg'
import logoutsvg from '../assets/logout.svg'
import loginsvg from '../assets/login.svg'
import { _ROUTE_ACCOUNT, _ROUTE_PEOPLE } from '../routes'
import { getLocalData } from '../util'
import ActionButton from './ActionButton'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, setRegisterMode } from '../reducers/userReducer'

const NavBar = () => {
  const localData = getLocalData()
  const userData = useSelector((state: any) => state.userData)

  const dispatch = useDispatch()
  return (
    <div className="navbar">
      {(localData || userData) ? (
        <>
          <NavButton
            src={editsvg}
            text="Редактировать профиль"
            to={_ROUTE_ACCOUNT}
          />
          <NavButton src={userssvg} text="Пользователи" to={_ROUTE_PEOPLE} />
          <NavButton
            src={logoutsvg}
            text="Выход"
            to={'/'}
            onClick={() => dispatch(logoutUser())}
          />
        </>
      ) : (
        <>
          <ActionButton
            src={loginsvg}
            text="Вход"
            onClick={() => dispatch(setRegisterMode(false))}
          />
          <ActionButton
            src={usersvg}
            text="Регистрация"
            onClick={() => dispatch(setRegisterMode(true))}
          />
        </>
      )}
    </div>
  )
}

export default NavBar
