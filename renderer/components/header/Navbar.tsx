import React from 'react'
import NavLink from './NavLink'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='border-gray-200 bg-[#192334] px-8 h-16 flex items-center justify-center'>
      <ul className='flex justify-end gap-12 '>
        <NavLink href='/clientes'>Clientes</NavLink>
        <NavLink href='/productos'>Productos</NavLink>
        <NavLink href='/pedidos'>Pedidos</NavLink>
        <NavLink href='/ventas'>Ventas</NavLink>
      </ul>
    </nav>
  )
}

export default Navbar
