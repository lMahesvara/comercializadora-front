import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  padding?: string
}

const Button = ({ children, onClick, padding = 'px-4 py-1 ' }: ButtonProps) => {
  return (
    <button
      className={`${padding} border rounded-lg bg-[#3c5170] hover:bg-[#2c3e4f] text-white 
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
