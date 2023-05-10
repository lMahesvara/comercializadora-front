import Table from './Table'
import TableHead from './TableHead'
import { IProducto } from '../../types/IProducto'
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'
import { currencyFormatter } from '../../utils/formatters'

type TablaProductosProps = {
  productos?: IProducto[]
  addFunction?: (producto: IProducto) => void
  editFunction?: (producto: IProducto) => void
}

const TablaProductos = ({
  productos,
  addFunction,
  editFunction,
}: TablaProductosProps) => {
  return (
    <Table>
      <TableHead headers={['id', 'nombre', 'precio (Kg)', 'cantidad (Kg)']} />
      <tbody>
        {productos.map((producto, i) => (
          <tr
            key={producto.id}
            className={`border-b border-gray-700 ${
              i % 2 === 0
                ? 'bg-[#446177] text-white'
                : 'bg-[#eceff1] text-black'
            }`}
          >
            <td className='px-6 py-4'>{producto.id}</td>
            <td className='px-6 py-4'>{producto.nombre}</td>
            <td className='px-6 py-4'>
              {currencyFormatter.format(producto.precio)}
            </td>
            <td className='px-6 py-4'>
              {producto.cantidad - producto.cantidadApartada}
            </td>
            <td className='px-6 py-4'>
              <div className='flex items-center gap-4'>
                {addFunction && (
                  <button onClick={() => addFunction(producto)}>
                    <AiOutlinePlus className='w-6 h-6' />
                  </button>
                )}
                {editFunction && (
                  <button onClick={() => editFunction(producto)}>
                    <AiOutlineEdit className='w-6 h-6' />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TablaProductos
