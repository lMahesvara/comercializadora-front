import { CgAdd } from 'react-icons/cg'
import { AiOutlineSearch } from 'react-icons/ai'
import Button from './Button'
import ModalCantidad from './ModalCantidad'
import { useState } from 'react'

type ModalAgregarProductoProps = {
  closeModal: () => void
}

const ModalAgregarProducto = ({ closeModal }: ModalAgregarProductoProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModalCantidad = () => {
    setIsOpen(true)
  }

  const closeModalCantidad = () => {
    setIsOpen(false)
  }
  return (
    <div className='absolute w-[500px] h-[630px] top-4 left-4 z-30 bg-[#1b2b44] p-4 rounded-xl space-y-4'>
      <h3 className='text-xl font-bold'>Productos</h3>
      <div className=''>
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
            className='block w-2/3 p-2 pl-10 text-sm text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg bg-gray-5'
            placeholder='Buscar producto...'
          />
        </div>
      </div>
      <div className='relative overflow-x-auto h-[450px]'>
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
              <td className='px-6 py-4'>
                <div className='flex items-center gap-4'>
                  <button onClick={openModalCantidad}>
                    <CgAdd className='w-6 h-6' />
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
              <td className='px-6 py-4'>
                <div className='flex items-center gap-4'>
                  <button onClick={openModalCantidad}>
                    <CgAdd className='w-6 h-6' />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button>Registrar</Button>
      </div>
      {isOpen && <ModalCantidad />}
    </div>
  )
}

export default ModalAgregarProducto
