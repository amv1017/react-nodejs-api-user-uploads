import React from 'react'
import { Link } from 'react-router-dom'

const NavButton = ({
  text,
  src,
  to,
  onClick
}: {
  text: string
  src: string
  to: string
  onClick?: (e: any) => void
}) => {
  return (
    <Link className="nav" to={to} onClick={onClick}>
      <img src={src} alt="" className="white-svg" />
      <p>{text}</p>
    </Link>
  )
}

export default NavButton
