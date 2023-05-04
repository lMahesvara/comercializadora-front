import Button from '../../../components/Button'
import { useState, useRef } from 'react'
import ModalAgregarProducto from '../../../components/pedidos/ModalAgregarProducto'
import TablaProductosPedido from '../../../components/tables/TablaProductosPedido'
import { IPedidosProducto } from '../../../types/IPedidosProducto'
import { toast } from 'react-toastify'
import { IFachadaControlador } from '../../../logic/IFachadaControlador'
import { FachadaControlador } from '../../../logic/fachadaControlador'
import { IProducto } from '../../../types/IProducto'
import { ICliente } from '../../../types/ICliente'
import { IPedido } from '../../../types/IPedido'
import { useRouter } from 'next/router'
import { LugarEntrega } from '../../../types/Enums'
import { currencyFormatter } from '../../../utils/formatters'

type EditarPedidoProps = {
  pedido: IPedido
  productos: IProducto[]
  clientes: ICliente[]
}

const EditarPedido = ({ pedido, productos, clientes }: EditarPedidoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [productosPedidos, setProductosPedidos] = useState<IPedidosProducto[]>(
    pedido.pedidosProducto
  )
  const [productosFiltrados, setProductos] = useState<IProducto[]>(productos)

  const formRef = useRef(null)
  const router = useRouter()

  const handleSubmit = () => {}

  const getTotal = () => {
    return productosPedidos?.reduce(
      (acc, producto) => acc + producto.producto.precio * producto.cantidad,
      0
    )
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const cancelarPedido = () => {
    router.push('/pedidos')
  }

  return (
    <main className='px-16 py-10'>
      <h1 className='text-4xl font-bold '>Registrar Venta</h1>
      <div className='flex gap-16 mt-8'>
        <section className='w-2/5 space-y-6 '>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>Datos del pedido</h3>
            <form
              ref={formRef}
              onSubmit={e => e.preventDefault()}
              className='space-y-4'
            >
              <div className='flex flex-col items-start'>
                <label
                  htmlFor='clientes'
                  className='mb-2 text-gray-900 dark:text-white'
                >
                  Cliente
                </label>
                <input
                  id='clientes'
                  type='text'
                  className='w-2/3 p-2 text-sm text-black placeholder-gray-400 bg-[#ededed] border border-gray-600 rounded-lg'
                  name='cliente'
                  defaultValue={
                    pedido.cliente.apodo +
                    ' - ' +
                    pedido.cliente.nombre +
                    ' ' +
                    pedido.cliente.apellido
                  }
                  disabled
                ></input>
              </div>
              <div className='flex flex-col items-start gap-2'>
                <label htmlFor='fechaEntrega'>Fecha de entrega</label>
                <input
                  className='w-2/3 p-2 text-sm bg-[#ededed] text-black rounded-lg '
                  type='date'
                  name='fechaEntrega'
                  id='fechaEntrega'
                  defaultValue={new Date(pedido.fecha).toLocaleDateString(
                    'en-CA'
                  )}
                  disabled
                />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='lugarEntrega' className='mb-2 text-white'>
                  Lugar de entrega
                </label>
                <input
                  id='lugarEntrega'
                  type='text'
                  className='w-2/3 p-2 text-sm text-black placeholder-gray-400 bg-[#ededed] border border-gray-600 rounded-lg'
                  name='lugarEntrega'
                  defaultValue={LugarEntrega[pedido.lugarEntrega]}
                  disabled
                ></input>
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='observaciones' className='mb-2 text-white'>
                  Observaciones
                </label>
                <textarea
                  className='w-2/3 p-2 text-sm bg-[#ededed] text-black rounded-lg'
                  name='observaciones'
                  id='observaciones'
                  rows={3}
                  defaultValue={pedido.observaciones}
                  disabled
                />
              </div>
              <div className='flex items-center justify-between w-2/3 !mt-8'>
                <Button onClick={cancelarPedido}>Cancelar</Button>
                <Button onClick={handleSubmit}>Saldo</Button>
                <Button onClick={handleSubmit}>Crédito</Button>
              </div>
            </form>
          </div>
        </section>
        <section className='w-3/5 h-full space-y-4'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold'>Datos del pedido</h3>
            </div>
            <div className='relative overflow-x-auto rounded-lg shadow-md'>
              <TablaProductosPedido
                productosPedido={productosPedidos}
                actions
              />
            </div>
            <div>
              <h3 className='text-xl font-bold'>
                Total: {currencyFormatter.format(getTotal())}
              </h3>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export async function getServerSideProps({ query }) {
  const facControlador: IFachadaControlador = new FachadaControlador()
  //get id from url
  const { id } = query

  const pedido = await facControlador.getPedido(id)

  console.log(pedido)

  return {
    props: {
      pedido,
    },
  }
}
export default EditarPedido
