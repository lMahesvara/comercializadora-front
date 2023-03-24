import Table from './Table'
import TableHead from './TableHead'
import { IProducto } from '../../types/IProducto'
import { AiOutlinePlus } from 'react-icons/ai'

type TablaProductosProps = {
  productos?: IProducto[]
  addFunction: (producto: IProducto) => void
}

const initialState: IProducto[] = [
  {
    id: 1,
    nombre: 'Producto 1',
    precio: 1000,
    cantidad: 10,
    cantidadApartada: 0,
  },
  {
    id: 2,
    nombre: 'Producto 2',
    precio: 2000,
    cantidad: 10,
    cantidadApartada: 0,
  },
  {
    id: 3,
    nombre: 'Producto 3',
    precio: 3000,
    cantidad: 10,
    cantidadApartada: 0,
  },
]

const TablaProductos = ({
  productos = initialState,
  addFunction,
}: TablaProductosProps) => {
  return (
    <Table>
      <TableHead headers={['id', 'nombre', 'precio']} />
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
            <td className='px-6 py-4'>{producto.precio}</td>
            <td className='px-6 py-4'>
              <div className='flex items-center gap-4'>
                <button onClick={() => addFunction(producto)}>
                  <AiOutlinePlus className='w-6 h-6' />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TablaProductos
