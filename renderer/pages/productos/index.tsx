import { AiOutlineSearch } from 'react-icons/ai'
import Button from '../../components/Button'
import { useRouter } from 'next/router'
import TablaProductos from '../../components/tables/TablaProductos'
import { IProducto } from '../../types/IProducto'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { useState } from 'react'
import ModalAgregarProducto from '../../components/productos/ModalAgregarProducto'
import ModalEditarCliente from '../../components/productos/ModalEditarProducto'
import ModalEditarProducto from '../../components/productos/ModalEditarProducto'
import ModalAgregarStock from '../../components/productos/ModalAgregarStock'

type AdministrarProductosProps = {
  productos: IProducto[]
}

const index = ({ productos }: AdministrarProductosProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [stockModal, setStockModal] = useState(false)
  const [producto, setProducto] = useState<IProducto>(null)
  const [productosFiltrados, setProductos] = useState<IProducto[]>(productos)

  const router = useRouter()

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const closeEditModal = () => {
    setEditModal(false)
  }

  const closeStockModal = () => {
    setStockModal(false)
  }

  const addStock = (producto: IProducto) => {
    setProducto(producto)
    setStockModal(true)
  }

  const editProducto = (producto: IProducto) => {
    setProducto(producto)
    setEditModal(true)
  }

  const filterByNombre = (nombre: string) => {
    const newProductos = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(nombre.toLowerCase())
    )
    setProductos(newProductos)
  }

  return (
    <>
      {isOpen && <ModalAgregarProducto toggle={closeModal} />}
      {editModal && (
        <ModalEditarProducto producto={producto} toggle={closeEditModal} />
      )}
      {stockModal && (
        <ModalAgregarStock producto={producto} toggle={closeStockModal} />
      )}
      <main className='p-4 space-y-8'>
        <h1 className='text-3xl font-bold text-center'>
          Administrar Productos
        </h1>
        <section className='flex justify-between max-w-4xl mx-auto !mt-10'>
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
                className='block p-2 pl-10 text-sm text-black bg-[#ededed] border border-gray-600 rounded-lg w-80 bg-gray-5'
                placeholder='Buscar producto por nombre'
                onChange={e => filterByNombre(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={openModal}>Registrar Producto</Button>
        </section>
        <section className='w-full max-w-4xl mx-auto'>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <TablaProductos
              productos={productosFiltrados}
              editFunction={editProducto}
              /* addFunction={addStock} */
            />
          </div>
        </section>
        <section className='w-full max-w-4xl mx-auto'>
          <Button onClick={() => router.push('/home')}>Volver</Button>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const facControlador: IFachadaControlador = new FachadaControlador()

  const productos = await facControlador.getProductos()

  return {
    props: {
      productos,
    },
  }
}

export default index
