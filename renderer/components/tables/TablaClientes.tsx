import Table from './Table'
import TableHead from './TableHead'
import { ICliente } from '../../types/ICliente'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useState } from 'react'
import MensajeConfirmacion from '../shared/MensajeConfirmacion'
import { currencyFormatter } from '../../utils/formatters'

type TablaClientesProps = {
  clientes: ICliente[]
  deleteCliente: (id: number) => void
  editCliente: (cliente: ICliente) => void
}

const TablaClientes = ({
  clientes,
  editCliente,
  deleteCliente,
}: TablaClientesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idCliente, setIdCliente] = useState(0)
  const handleDelete = () => {
    deleteCliente(idCliente)
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <MensajeConfirmacion
          accept={handleDelete}
          closeModal={() => setIsModalOpen(false)}
          message='¿Está seguro que desea eliminar este cliente?'
        />
      )}
      <Table>
        <TableHead headers={['Id', 'Nombre', 'Apellido', 'Apodo', 'Adeudo']} />
        <tbody>
          {clientes.map((cliente, i) => (
            <tr
              key={cliente.id}
              className={`border-b border-gray-700 ${
                i % 2 === 0
                  ? 'bg-[#446177] text-white'
                  : 'bg-[#eceff1] text-black'
              }`}
            >
              <td className='px-6 py-4'>{cliente.id}</td>
              <td className='px-6 py-4'>{cliente.nombre}</td>
              <td className='px-6 py-4'>{cliente.apellido}</td>
              <td className='px-6 py-4'>{cliente.apodo}</td>
              <td className='px-6 py-4'>
                {currencyFormatter.format(cliente.adeudo)}
              </td>
              <td className='px-6 py-4'>
                <div className='flex items-center gap-4'>
                  <button onClick={() => editCliente(cliente)}>
                    <AiOutlineEdit className='w-6 h-6' />
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true)
                      setIdCliente(cliente.id)
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

export default TablaClientes
