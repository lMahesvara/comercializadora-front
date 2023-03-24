import Table from './Table'
import TableHead from './TableHead'
import { IPedido } from '../../types/IPedido'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

type TablaPedidosProps = {
  pedidos: IPedido[]
  deletePedido: (id: number) => void
}

const TablaPedidos = ({ pedidos, deletePedido }: TablaPedidosProps) => {
  const dateFormatter = (date: string) => {
    const dateObj = new Date(date)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <Table>
      <TableHead
        headers={[
          'id',
          'cliente',
          'total',
          'fecha de entrega',
          'Lugar de entrega',
        ]}
      />
      <tbody>
        {pedidos.map((pedido, i) => (
          <tr
            key={pedido.id}
            className={`border-b border-gray-700 ${
              i % 2 === 0
                ? 'bg-[#446177] text-white'
                : 'bg-[#eceff1] text-black'
            }`}
          >
            <td className='px-6 py-4'>{pedido.id}</td>
            <td className='px-6 py-4'>{pedido.cliente.nombre}</td>
            <td className='px-6 py-4'>{pedido.precioTotal}</td>
            <td className='px-6 py-4'>{dateFormatter(pedido.fecha)}</td>
            <td className='px-6 py-4'>{pedido.lugarEntrega}</td>
            <td className='px-6 py-4'>
              <div className='flex items-center gap-4'>
                <button>
                  <AiOutlineEdit className='w-6 h-6' />
                </button>
                <button onClick={() => deletePedido(pedido.id)}>
                  <AiOutlineDelete className='w-6 h-6' />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TablaPedidos
