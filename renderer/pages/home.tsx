import { useRouter } from 'next/router'
import Button from '../components/Button'

function Home() {
  const router = useRouter()
  return (
    <main className='flex w-full h-screen divide-x-4 divide-white'>
      <div className='flex items-center justify-center w-3/5 gap-4'>
        <Button onClick={() => router.push('/pedidos')}>Pedidos</Button>
        <Button onClick={() => router.push('/clientes')}>Clientes</Button>
        <Button onClick={() => router.push('/login')}>Login</Button>
        <Button onClick={() => router.push('/ventas')}>ventas</Button>
        <Button onClick={() => router.push('/productos')}>Productos</Button>
      </div>
      <div className='flex items-center justify-center w-2/5 p-16'>
        <img className='w-[400px] ' src='/images/logo.png' />
      </div>
    </main>
  )
}

export default Home
