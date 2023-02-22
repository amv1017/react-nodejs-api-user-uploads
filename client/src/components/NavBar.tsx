import React from 'react'
import { Link } from 'react-router-dom'
import { _ROUTE_ACCOUNT, _ROUTE_PEOPLE } from '../routes'


const NavBar = () => {
  return (
    <div className="navbar">
      <Link to={_ROUTE_ACCOUNT}>
        Профиль
      </Link>
      <Link to={_ROUTE_PEOPLE}>
        Пользователи
      </Link>
    </div>
  )
}

export default NavBar
