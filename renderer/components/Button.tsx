import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className='px-4 py-1 border rounded-lg bg-[#3c5170]'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
