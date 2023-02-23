import React from 'react'

const ActionButton = (props: {
  text: string
  src: string
  onClick: () => void
}) => {
  const { text, src, onClick } = props
  return (
    <button className="nav" onClick={onClick}>
      <img src={src} alt="" className="white-svg" />
      <p>{text}</p>
    </button>
  )
}

export default ActionButton
