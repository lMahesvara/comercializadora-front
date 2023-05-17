import { useRouter } from 'next/router'
import Button from '../components/Button'
import Navbar from '../components/header/Navbar'

function Home() {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <main className='flex items-center justify-center w-full h-[calc(100vh-4rem)]'>
        <img className='max-w-md' src='/images/logo.png' />
      </main>
    </>
  )
}

export default Home
