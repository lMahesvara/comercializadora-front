import { AiOutlineDelete } from 'react-icons/ai'
import Button from '../components/Button'
import { useState } from 'react'
import ModalAgregarProducto from '../components/ModalAgregarProducto'

const AgregarPedido = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <main className='px-16 py-10'>
      {isOpen && <ModalAgregarProducto closeModal={closeModal} />}
      <h1 className='text-4xl font-bold '>Agregar Pedido</h1>
      <div className='flex gap-16 mt-8'>
        <section className='w-2/5 space-y-6 '>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>Datos del pedido</h3>
            <div className='flex flex-col items-start'>
              <label
                htmlFor='clientes'
                className='mb-2 text-gray-900 dark:text-white'
              >
                Cliente
              </label>
              <select
                id='clientes'
                className='w-2/3 p-2 text-sm text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='1'>Erick Bernal</option>
                <option value='2'>Juan Perez</option>
                <option value='3'>Pedro Martinez</option>
              </select>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='fechaEntrega'>Fecha de entrega</label>
              <input
                className='w-2/3 p-2 text-sm bg-gray-700 rounded-lg '
                type='date'
                name='fechaEntrega'
                id='fechaEntrega'
              />
            </div>
            <div className='flex flex-col items-start'>
              <label
                htmlFor='lugarEntrega'
                className='mb-2 text-gray-900 dark:text-white'
              >
                Lugar de entrega
              </label>
              <select
                id='lugarEntrega'
                className='w-2/3 p-2 text-sm text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='1'>Almacen 1</option>
                <option value='2'>Almacen 2</option>
                <option value='3'>Almacen 3</option>
              </select>
            </div>
            <div className='flex items-center justify-between w-2/3 mt-4'>
              <Button>Cancelar</Button>
              <Button>Registrar</Button>
            </div>
          </div>
        </section>
        <section className='w-3/5 h-full my-auto space-y-4'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold'>Datos del pedido</h3>
              <Button onClick={openModal}>Agregar Producto</Button>
            </div>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Id
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Nombre
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Precio
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Cantidad
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Total
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
                          <AiOutlineDelete className='w-6 h-6' />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AgregarPedido
