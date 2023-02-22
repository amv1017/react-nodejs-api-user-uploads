import React from 'react'
import { Link } from 'react-router-dom'

const NavButton = ({
  text,
  src,
  to,
}: {
  text: string
  src: string
  to: string
}) => {
  return (
    <Link className="nav" to={to}>
      <img src={src} alt="" className="white-svg" />
      <p>{text}</p>
    </Link>
  )
}

export default NavButton
