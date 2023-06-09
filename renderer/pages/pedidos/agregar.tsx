import Button from '../../components/Button'
import { useState, useRef } from 'react'
import ModalAgregarProducto from '../../components/pedidos/ModalAgregarProducto'
import TablaProductosPedido from '../../components/tables/TablaProductosPedido'
import { IPedidosProducto } from '../../types/IPedidosProducto'
import { toast } from 'react-toastify'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { IProducto } from '../../types/IProducto'
import { ICliente } from '../../types/ICliente'
import { IPedido } from '../../types/IPedido'
import { useRouter } from 'next/router'
import { LugarEntrega } from '../../types/Enums'
import { currencyFormatter } from '../../utils/formatters'

type AgregarPedidoProps = {
  productos: IProducto[]
  clientes: ICliente[]
}

const AgregarPedido = ({ productos, clientes }: AgregarPedidoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [productosPedidos, setProductosPedidos] = useState<IPedidosProducto[]>(
    []
  )
  const [productosFiltrados, setProductos] = useState<IProducto[]>(productos)

  const formRef = useRef(null)
  const router = useRouter()

  const filterByNombre = (nombre: string) => {
    const newProductos = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(nombre.toLowerCase())
    )
    setProductos(newProductos)
  }

  const addProduct = (productoPedido: IPedidosProducto) => {
    const index = productosPedidos.findIndex(
      producto => producto.producto.id === productoPedido.producto.id
    )
    if (index === -1) {
      setProductosPedidos([...productosPedidos, productoPedido])
    } else {
      const newProductosPedidos = [...productosPedidos]
      newProductosPedidos[index].cantidad += productoPedido.cantidad
      setProductosPedidos(newProductosPedidos)
    }
  }

  const removeProduct = (id: number) => {
    const newProductosPedidos = productosPedidos.filter(
      producto => producto.producto.id !== id
    )
    setProductosPedidos(newProductosPedidos)
  }

  const handleSubmit = () => {
    if (!checkForm()) {
      return
    }

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())

    const fachadaControlador: IFachadaControlador = new FachadaControlador()

    const cliente: ICliente = clientes[Number(data.cliente) - 1]
    const lugarEntrega = data.lugarEntrega as string
    const fecha = data.fechaEntrega as string
    const pedidosProducto = productosPedidos
    const precioTotal = getTotal()
    const observaciones = data.observaciones as string

    cliente.pedidos = undefined

    const pedido: IPedido = {
      cliente,
      lugarEntrega,
      fecha,
      pedidosProducto,
      precioTotal,
      saldo: precioTotal,
      observaciones,
      pagado: false,
    }
    console.log(JSON.stringify(pedido))

    fachadaControlador.postPedido(pedido).then(_ => {
      toast.success('Pedido agregado')
      router.push('/pedidos')
    })
  }

  const getTotal = () => {
    return productosPedidos.reduce(
      (acc, producto) => acc + producto.producto.precio * producto.cantidad,
      0
    )
  }

  const checkForm = () => {
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    const date = new Date(data.fechaEntrega.toString())
    date.setDate(date.getDate() + 1)
    date.setHours(23, 59, 59, 999)
    if (data.cliente === '0') {
      toast.error('Seleccione un cliente')
      return false
    }
    if (productosPedidos.length === 0) {
      toast.error('Agregue al menos un producto')
      return false
    }
    if (data.fechaEntrega === '') {
      toast.error('Seleccione una fecha de entrega')
      return false
    }
    if (date < new Date()) {
      toast.error('La fecha de entrega no puede ser menor a la fecha actual')
      return false
    }
    if (data.lugarEntrega === '0') {
      toast.error('Seleccione un lugar de entrega')
      return false
    }
    if (data.observaciones.length > 100) {
      toast.error('Las observaciones no pueden tener más de 100 caracteres')
      return false
    }
    return true
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
      {isOpen && (
        <ModalAgregarProducto
          productos={productosFiltrados}
          addProduct={addProduct}
          closeModal={closeModal}
          filterByNombre={filterByNombre}
        />
      )}
      <h1 className='text-4xl font-bold '>Agregar Pedido</h1>
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
                <select
                  id='clientes'
                  className='w-2/3 p-2 text-sm text-black placeholder-gray-400 bg-[#ededed] border border-gray-600 rounded-lg '
                  name='cliente'
                >
                  <option value='0'>Seleccione un cliente</option>
                  {clientes.map((cliente, i) => (
                    <option key={cliente.id} value={i + 1}>
                      {cliente.apodo}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col items-start gap-2'>
                <label htmlFor='fechaEntrega'>Fecha de entrega</label>
                <input
                  className='w-2/3 p-2 text-sm bg-[#ededed] text-black rounded-lg '
                  type='date'
                  name='fechaEntrega'
                  id='fechaEntrega'
                />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='lugarEntrega' className='mb-2 text-white'>
                  Lugar de entrega
                </label>
                <select
                  id='lugarEntrega'
                  className='w-2/3 p-2 text-sm text-black placeholder-gray-400 bg-[#ededed] border border-gray-600 rounded-lg'
                  name='lugarEntrega'
                >
                  <option value='0'>Seleccione un lugar</option>
                  {Object.keys(LugarEntrega).map((lugar, i) => (
                    <option key={i} value={lugar}>
                      {lugar}
                    </option>
                  ))}
                </select>
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
                />
              </div>
              <div className='flex items-center justify-between w-2/3 !mt-8'>
                <Button onClick={cancelarPedido}>Cancelar</Button>
                <Button onClick={handleSubmit}>Registrar</Button>
              </div>
            </form>
          </div>
        </section>
        <section className='w-3/5 h-full space-y-4'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold'>Datos del pedido</h3>
              <Button onClick={openModal}>Agregar Producto</Button>
            </div>
            <div className='relative overflow-x-auto rounded-lg shadow-md'>
              <TablaProductosPedido
                productosPedido={productosPedidos}
                deleteFunction={removeProduct}
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

export async function getServerSideProps({ req, res }) {
  const facControlador: IFachadaControlador = new FachadaControlador()

  const productos = await facControlador.getProductos()
  console.log(productos)
  const clientes = await facControlador.getClientes()

  return {
    props: {
      productos,
      clientes,
    },
  }
}

export default AgregarPedido
