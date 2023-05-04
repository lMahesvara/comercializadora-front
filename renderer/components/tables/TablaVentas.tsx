import Table from './Table'
import TableHead from './TableHead'
import { IPedido } from '../../types/IPedido'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useState } from 'react'
import MensajeConfirmacion from '../shared/MensajeConfirmacion'
import { currencyFormatter } from '../../utils/formatters'

type TablaVentasProps = {
  pedidos: IPedido[]
  openPedido: (id: number) => void
}

const TablaVentas = ({ pedidos, openPedido }: TablaVentasProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idPedido, setIdPedido] = useState(0)

  const dateFormatter = (date: string) => {
    const dateObj = new Date(date)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <>
      <Table>
        <TableHead
          headers={[
            'id',
            'cliente',
            'fecha de entrega',
            'Lugar de entrega',
            'total',
            'saldo',
          ]}
          actions
        />
        <tbody>
          {pedidos.map((pedido, i) => (
            <tr
              key={pedido.id}
              className={`border-b border-gray-700 ${
                i % 2 === 0
                  ? 'bg-[#446177] text-white hover:bg-[#2a3e4c] '
                  : 'bg-[#eceff1] text-black hover:bg-[#d0d5d8]'
              } cursor-pointer
              `}
              onClick={() => openPedido(pedido.id)}
            >
              <td className='px-6 py-4'>{pedido.id}</td>
              <td className='px-6 py-4'>{pedido.cliente.apodo}</td>
              <td className='px-6 py-4'>{dateFormatter(pedido.fecha)}</td>
              <td className='px-6 py-4'>{pedido.lugarEntrega}</td>
              <td className='px-6 py-4'>
                {currencyFormatter.format(pedido.precioTotal)}
              </td>
              <td className='px-6 py-4'>
                {currencyFormatter.format(pedido.saldo)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default TablaVentas
