import Button from '../components/Button'

const login = () => {
  return (
    <main className='flex items-center justify-center w-full h-screen'>
      <div className='w-96 mx-auto bg-[#1b2b44] rounded-xl px-8 py-4'>
        <img
          src='/images/logo.png'
          alt='Logo de la empresa'
          className='w-48 mx-auto'
        />
        <form className='flex flex-col gap-4 mt-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='usuario'>Usuario</label>
            <input
              type='text'
              id='usuario'
              name='usuario'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='passowrd'>Contraseña</label>
            <input
              type='password'
              id='password'
              name='password'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
            />
          </div>
          <div className='flex items-center justify-center mt-2'>
            <Button>Acceder</Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default login
