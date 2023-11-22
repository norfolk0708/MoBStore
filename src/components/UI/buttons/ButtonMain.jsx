import React from 'react'
const ButtonMain = ({ children, ...props }) => {
  return (
    <button className='formButton'{...props}>
      {children}
    </button>
  )
}

export default ButtonMain
