import Button from '../../components/Button'
import { AiOutlineSearch } from 'react-icons/ai'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { ICliente } from '../../types/ICliente'
import TablaClientes from '../../components/tables/TablaClientes'
import ModalAgregarCliente from '../../components/clientes/ModalAgregarCliente'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import ModalEditarCliente from '../../components/clientes/ModalEditarCliente'

type AdministrarClientesProps = {
  clientes: ICliente[]
}

const index = ({ clientes }: AdministrarClientesProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [cliente, setCliente] = useState<ICliente>(null)
  const [clientesFiltrados, setClientes] = useState<ICliente[]>(clientes)

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

  const editCliente = (cliente: ICliente) => {
    setCliente(cliente)
    setEditModal(true)
  }

  const deleteCliente = (id: number) => {
    const facControlador: IFachadaControlador = new FachadaControlador()
    facControlador.deleteCliente(id).then(_ => {
      toast.success('Cliente eliminado correctamente')
      router.reload()
    })
  }

  const filterByApodo = (apodo: string) => {
    const newClientes = clientes.filter(cliente =>
      cliente.apodo.toLowerCase().includes(apodo.toLowerCase())
    )
    setClientes(newClientes)
  }

  return (
    <>
      {isOpen && <ModalAgregarCliente toggle={closeModal} />}
      {editModal && (
        <ModalEditarCliente cliente={cliente} toggle={closeEditModal} />
      )}
      <main className='p-4 space-y-8'>
        <h1 className='text-3xl font-bold text-center'>Administrar Clientes</h1>
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
                placeholder='Buscar Cliente por apodo...'
                onChange={e => filterByApodo(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={openModal}>Registrar Cliente</Button>
        </section>
        <section className='w-full max-w-4xl mx-auto'>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <TablaClientes
              clientes={clientesFiltrados}
              deleteCliente={deleteCliente}
              editCliente={editCliente}
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

  const clientes = await facControlador.getClientes()

  return {
    props: {
      clientes,
    },
  }
}

export default index
