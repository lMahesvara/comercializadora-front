import { AiOutlineCheckCircle, AiOutlineDelete } from 'react-icons/ai'
import { IPedidosProducto } from '../types/IPedidosProducto'
import { useState } from 'react'
import { IProducto } from '../types/IProducto'

type ModalCantidadProps = {
  closeModalCantidad: () => void
  addProduct: (productoPedido: IPedidosProducto) => void
  producto: IProducto
}

const ModalCantidad = ({
  closeModalCantidad,
  addProduct,
  producto,
}: ModalCantidadProps) => {
  const [cantidad, setCantidad] = useState(1)

  const handleAddProduct = () => {
    const productoPedido: IPedidosProducto = {
      cantidad: cantidad || 1,
      producto,
    }
    addProduct(productoPedido)
    closeModalCantidad()
  }

  return (
    <div className='absolute left-0 z-10 flex items-center justify-center w-full h-full -top-4 bg-[#000]/50 rounded-xl'>
      <div className='  py-4 px-6 bg-[#283852] rounded-2xl '>
        <div className='flex flex-col items-center gap-4'>
          <h3 className='text-2xl font-bold'>Cantidad</h3>
          <input
            type='number'
            autoFocus
            value={cantidad}
            min={1}
            max={100}
            onChange={e => setCantidad(Number(e.target.value))}
            className='w-24 py-1 rounded-xl text-[#000] font-bold text-lg bg-[#ededed] text-center'
          />
        </div>
        <div className='flex items-center gap-2 mt-4 justify-evenly'>
          <button onClick={closeModalCantidad}>
            <AiOutlineDelete className='w-8 h-8' />
          </button>
          <button onClick={handleAddProduct}>
            <AiOutlineCheckCircle className='w-8 h-8' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCantidad
