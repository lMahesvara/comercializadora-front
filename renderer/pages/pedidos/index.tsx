import { useRouter } from 'next/router'
import Button from '../../components/Button'
import { AiOutlineSearch } from 'react-icons/ai'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { IPedido } from '../../types/IPedido'
import TablaPedidos from '../../components/tables/TablaPedidos'
import { useState } from 'react'
import { toast } from 'react-toastify'

type AdministrarPedidosProps = {
  pedidos: IPedido[]
}

function AdministrarPedidos({ pedidos }: AdministrarPedidosProps) {
  const [pedidosFiltrados, setPedidosFiltrados] = useState(pedidos)
  const router = useRouter()

  const handleRegister = () => {
    router.push('/pedidos/agregar')
  }

  const handleEdit = (id: number) => {
    router.push(`/pedidos/editar/${id}`)
  }

  const handleDelete = (id: number) => {
    const facControlador: IFachadaControlador = new FachadaControlador()
    facControlador
      .deletePedido(id)
      .then(_ => {
        toast.success('Pedido eliminado correctamente')
        router.reload()
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  const handleSearch = (cliente: string) => {
    const pedidosFiltrados = pedidos.filter(pedido => {
      return pedido.cliente.apodo.toLowerCase().includes(cliente.toLowerCase())
    })
    setPedidosFiltrados(pedidosFiltrados)
  }

  return (
    <main className='p-4 space-y-8'>
      <h1 className='text-3xl font-bold text-center'>Administrar Pedidos</h1>
      <section className='flex justify-between max-w-4xl mx-auto !mt-10'>
        <div className='flex gap-4'>
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
                placeholder='Buscar pedido por cliente...'
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button onClick={handleRegister}>Registrar Pedido</Button>
      </section>
      <section className='w-full max-w-4xl mx-auto'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <TablaPedidos
            pedidos={pedidosFiltrados}
            deletePedido={handleDelete}
            editPedido={handleEdit}
          />
        </div>
      </section>
      <section className='w-full max-w-4xl mx-auto'>
        <Button onClick={() => router.push('/home')}>Volver</Button>
      </section>
    </main>
  )
}

export async function getServerSideProps({ req, res }) {
  const facControlador: IFachadaControlador = new FachadaControlador()

  const pedidos = await facControlador.getPedidos()
  //console.log(pedidos)

  return {
    props: {
      pedidos,
    },
  }
}

export default AdministrarPedidos
