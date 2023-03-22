import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

function Home() {
  return (
    <React.Fragment>
      <div className='grid w-full text-2xl text-center grid-col-1'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
        <span>⚡ Electron ⚡</span>
        <span>+</span>
        <span>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
      <div className='flex flex-wrap justify-center w-full mt-1'>
        <Link href='/administrar-pedidos'>
          <a className='btn-blue'>Go to next page</a>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Home
