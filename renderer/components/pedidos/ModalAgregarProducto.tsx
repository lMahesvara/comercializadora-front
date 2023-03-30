import { AiOutlineSearch } from 'react-icons/ai'
import Button from '../Button'
import ModalCantidad from './ModalCantidad'
import { useState } from 'react'
import TablaProductos from '../tables/TablaProductos'
import { IPedidosProducto } from '../../types/IPedidosProducto'
import { IProducto } from '../../types/IProducto'

type ModalAgregarProductoProps = {
  closeModal: () => void
  addProduct: (productoPedido: IPedidosProducto) => void
  productos: IProducto[]
  filterByNombre: (nombre: string) => void
}

const ModalAgregarProducto = ({
  closeModal,
  addProduct,
  productos,
  filterByNombre,
}: ModalAgregarProductoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [producto, setProducto] = useState<IProducto>()

  const openModalCantidad = () => {
    setIsOpen(true)
  }

  const closeModalCantidad = () => {
    setIsOpen(false)
  }

  const handleSetProducto = (producto: IProducto) => {
    setProducto(producto)
    openModalCantidad()
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
            name='table-search'
            onChange={e => filterByNombre(e.target.value)}
            className='block w-2/3 p-2 pl-10 text-sm text-black bg-[#ededed] border border-gray-600 rounded-lg '
            placeholder='Buscar producto...'
          />
        </div>
      </div>
      <div className='flex flex-col justify-between h-[500px]'>
        <div className='relative overflow-x-auto rounded-lg'>
          <TablaProductos
            addFunction={handleSetProducto}
            productos={productos}
          />
        </div>
        <div className='flex items-center mt-4 '>
          <Button onClick={closeModal}>Cerrar</Button>
        </div>
      </div>
      {isOpen && (
        <ModalCantidad
          producto={producto}
          closeModalCantidad={closeModalCantidad}
          addProduct={addProduct}
        />
      )}
    </div>
  )
}

export default ModalAgregarProducto
