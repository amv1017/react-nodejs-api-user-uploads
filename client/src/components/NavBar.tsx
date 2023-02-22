import NavButton from './NavButton'
import editsvg from '../assets/edit.svg'
import userssvg from '../assets/users.svg'
import usersvg from '../assets/user.svg'
import logoutsvg from '../assets/logout.svg'
import loginsvg from '../assets/login.svg'
import { _ROUTE_ACCOUNT, _ROUTE_PEOPLE } from '../routes'
import { getTokenFromLocalStorage } from '../util'
import ActionButton from './ActionButton'
import { useDispatch, useSelector } from 'react-redux'
import { setRegisterMode } from '../reducers/userReducer'

const NavBar = () => {
  const token = getTokenFromLocalStorage()

  const dispatch = useDispatch()
  return (
    <div className="navbar">
      {token ? (
        <>
          <NavButton
            src={editsvg}
            text="Редактировать профиль"
            to={_ROUTE_ACCOUNT}
          />
          <NavButton src={userssvg} text="Пользователи" to={_ROUTE_PEOPLE} />
          <NavButton src={logoutsvg} text="Выход" to={'/'} />
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
