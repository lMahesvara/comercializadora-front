import Link from 'next/link'

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href}>
      <a className='text-white font-medium text-lg hover:bg-[#2C3F5F] px-4 py-1 rounded-md cursor-pointer'>
        {children}
      </a>
    </Link>
  )
}

export default NavLink
