import Table from './Table'
import TableHead from './TableHead'
import { AiOutlineDelete } from 'react-icons/ai'
import { IPedidosProducto } from '../../types/IPedidosProducto'

type TablaProductosPedidoProps = {
  productosPedido: IPedidosProducto[]
  deleteFunction?: (id: number) => void
  actions?: boolean
}

const TablaProductosPedido = ({
  productosPedido,
  deleteFunction,
  actions,
}: TablaProductosPedidoProps) => {
  return (
    <Table>
      <TableHead
        headers={['id', 'nombre', 'precio', 'cantidad', 'total']}
        actions={actions}
      />
      <tbody>
        {productosPedido?.map((prodPed, i) => (
          <tr
            key={prodPed.producto.id}
            className={`border-b border-gray-700 ${
              i % 2 === 0
                ? 'bg-[#446177] text-white'
                : 'bg-[#eceff1] text-black'
            } `}
          >
            <td className='px-6 py-4'>{prodPed.producto.id}</td>
            <td className='px-6 py-4'>{prodPed.producto.nombre}</td>
            <td className='px-6 py-4'>{prodPed.producto.precio}</td>
            <td className='px-6 py-4'>{prodPed.cantidad}</td>
            <td className='px-6 py-4'>
              {prodPed.cantidad * prodPed.producto.precio}
            </td>
            {!actions && (
              <td className='px-6 py-4'>
                <div className='flex items-center gap-4'>
                  <button onClick={() => deleteFunction(prodPed.producto.id)}>
                    <AiOutlineDelete className='w-6 h-6' />
                  </button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TablaProductosPedido
