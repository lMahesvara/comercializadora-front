import { useRouter } from 'next/router'
import Button from '../components/Button'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSearch } from 'react-icons/ai'

function AdministrarPedidos() {
  const router = useRouter()

  const handleRegister = () => {
    router.push('/agregar-pedido')
  }

  return (
    <main className='p-4 space-y-8'>
      <h1 className='text-3xl font-bold text-center'>Administrar Pedidos</h1>
      <section className='flex justify-between max-w-4xl mx-auto !mt-10'>
        <div className='flex gap-4'>
          <Button>Buscar</Button>
          <div className='bg-white dark:bg-gray-900'>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <AiOutlineSearch className='w-5 h-5 text-gray-400' />
              </div>
              <input
                type='text'
                id='table-search'
                className='block p-2 pl-10 text-sm text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg w-80 bg-gray-5'
                placeholder='Buscar pedido...'
              />
            </div>
          </div>
        </div>
        <Button onClick={handleRegister}>Registrar Pedido</Button>
      </section>
      <section className='w-full max-w-4xl mx-auto'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Id
                </th>
                <th scope='col' className='px-6 py-3'>
                  Cliente
                </th>
                <th scope='col' className='px-6 py-3'>
                  Total
                </th>
                <th scope='col' className='px-6 py-3'>
                  Fecha de entrega
                </th>
                <th scope='col' className='px-6 py-3'>
                  Lugar de entrega
                </th>
                <th scope='col' className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  123123
                </th>
                <td className='px-6 py-4'>Erick Bernal</td>
                <td className='px-6 py-4'>$2999</td>
                <td className='px-6 py-4'>22/02/2023</td>
                <td className='px-6 py-4'>Almacen 1</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-4'>
                    <button>
                      <AiOutlineEdit className='w-6 h-6' />
                    </button>
                    <button>
                      <AiOutlineDelete className='w-6 h-6' />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className='border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  123123
                </th>
                <td className='px-6 py-4'>Erick Bernal</td>
                <td className='px-6 py-4'>$2999</td>
                <td className='px-6 py-4'>22/02/2023</td>
                <td className='px-6 py-4'>Almacen 1</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-4'>
                    <button>
                      <AiOutlineEdit className='w-6 h-6' />
                    </button>
                    <button>
                      <AiOutlineDelete className='w-6 h-6' />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default AdministrarPedidos
