import Table from './Table'
import TableHead from './TableHead'
import { IPedido } from '../../types/IPedido'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useState } from 'react'
import MensajeConfirmacion from '../shared/MensajeConfirmacion'
import { currencyFormatter } from '../../utils/formatters'

type TablaPedidosProps = {
  pedidos: IPedido[]
  deletePedido: (id: number) => void
  editPedido: (id: number) => void
}

const TablaPedidos = ({
  pedidos,
  deletePedido,
  editPedido,
}: TablaPedidosProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idPedido, setIdPedido] = useState(0)

  const dateFormatter = (date: string) => {
    const dateObj = new Date(date)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleDelete = () => {
    deletePedido(idPedido)
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <MensajeConfirmacion
          accept={handleDelete}
          closeModal={() => setIsModalOpen(false)}
          message='¿Está seguro que desea eliminar este pedido?'
        />
      )}
      <Table>
        <TableHead
          headers={[
            'id',
            'cliente',
            'fecha de entrega',
            'Lugar de entrega',
            'total',
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
              <td className='px-6 py-4'>{pedido.cliente.apodo}</td>
              <td className='px-6 py-4'>{dateFormatter(pedido.fecha)}</td>
              <td className='px-6 py-4'>{pedido.lugarEntrega}</td>
              <td className='px-6 py-4'>
                {currencyFormatter.format(pedido.precioTotal)}
              </td>
              <td className='px-6 py-4'>
                <div className='flex items-center gap-4'>
                  <button onClick={() => editPedido(pedido.id)}>
                    <AiOutlineEdit className='w-6 h-6' />
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true)
                      setIdPedido(pedido.id)
                    }}
                  >
                    <AiOutlineDelete className='w-6 h-6' />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default TablaPedidos
