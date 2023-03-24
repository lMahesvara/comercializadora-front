import Button from '../components/Button'
import { useState, useRef } from 'react'
import ModalAgregarProducto from '../components/ModalAgregarProducto'
import TablaProductosPedido from '../components/tables/TablaProductosPedido'
import { IPedidosProducto } from '../types/IPedidosProducto'
import { toast } from 'react-toastify'
import { IFachadaControlador } from '../logic/IFachadaControlador'
import { FachadaControlador } from '../logic/fachadaControlador'
import { IProducto } from '../types/IProducto'
import { ICliente } from '../types/ICliente'
import { IPedido } from '../types/IPedido'
import { useRouter } from 'next/router'

const initialState: IPedidosProducto[] = [
  {
    id: 1,
    cantidad: 2,
    producto: {
      id: 1,
      nombre: 'Producto 1',
      precio: 1000,
      cantidad: 10,
      cantidadApartada: 0,
    },
  },
  {
    id: 1,
    cantidad: 2,
    producto: {
      id: 1,
      nombre: 'Producto 1',
      precio: 1000,
      cantidad: 10,
      cantidadApartada: 0,
    },
  },
  {
    id: 1,
    cantidad: 2,
    producto: {
      id: 1,
      nombre: 'Producto 1',
      precio: 1000,
      cantidad: 10,
      cantidadApartada: 0,
    },
  },
  {
    id: 1,
    cantidad: 2,
    producto: {
      id: 1,
      nombre: 'Producto 1',
      precio: 1000,
      cantidad: 10,
      cantidadApartada: 0,
    },
  },
]

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
    const precioTotal = productosPedidos.reduce(
      (acc, producto) => acc + producto.producto.precio * producto.cantidad,
      0
    )

    const pedido: IPedido = {
      cliente,
      lugarEntrega,
      fecha,
      pedidosProducto,
      precioTotal,
    }
    console.log(JSON.stringify(pedido))

    fachadaControlador.postPedido(pedido)

    toast.success('Pedido agregado')
    router.push('/administrar-pedidos')
  }

  const checkForm = () => {
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
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
    if (data.fechaEntrega < new Date().toISOString().split('T')[0]) {
      toast.error('La fecha de entrega no puede ser menor a la fecha actual')
      return false
    }
    if (data.lugarEntrega === '0') {
      toast.error('Seleccione un lugar de entrega')
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
    router.push('/administrar-pedidos')
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
                      {cliente.nombre}
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
                  <option value='Almacen 1'>Almacen 1</option>
                  <option value='Almacen 2'>Almacen 2</option>
                  <option value='Almacen 3'>Almacen 3</option>
                </select>
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
          </div>
        </section>
      </div>
    </main>
  )
}

export async function getServerSideProps({ req, res }) {
  const facControlador: IFachadaControlador = new FachadaControlador()

  const productos = await facControlador.getProductos()
  const clientes = await facControlador.getClientes()

  return {
    props: {
      productos,
      clientes,
    },
  }
}

export default AgregarPedido
