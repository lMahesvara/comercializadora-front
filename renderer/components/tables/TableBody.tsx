import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'

type TableBodyProps = {
  content?: object[]
  edit?: boolean
  remove?: boolean
  add?: boolean
  addFunction?: () => void
  deleteFunction?: () => void
  editFunction?: () => void
}

const initialState = [
  {
    id: 1,
    nombre: 'Erick Bernal',
    total: '$2999',
    fecha: '22/02/2023',
    almacen: 'Almacen 1',
  },
  {
    id: 2,
    nombre: 'Erick Bernal',
    total: '$2999',
    fecha: '22/02/2023',
    almacen: 'Almacen 1',
  },
  {
    id: 3,
    nombre: 'Erick Bernal',
    total: '$2999',
    fecha: '22/02/2023',
    almacen: 'Almacen 1',
  },
  {
    id: 4,
    nombre: 'Erick Bernal',
    total: '$2999',
    fecha: '22/02/2023',
    almacen: 'Almacen 1',
  },
]

const TableBody = ({
  content = initialState,
  edit,
  add,
  remove,
  addFunction,
  deleteFunction,
  editFunction,
}: TableBodyProps) => {
  return (
    <tbody>
      {content.map(item => (
        <tr key={item['id']} className='bg-gray-800 border-b border-gray-700'>
          {Object.keys(item).map(key => (
            <td key={key} className='px-6 py-4'>
              {item[key]}
            </td>
          ))}
          <td className='px-6 py-4'>
            <div className='flex items-center gap-4'>
              {edit && (
                <button onClick={editFunction}>
                  <AiOutlineEdit className='w-6 h-6' />
                </button>
              )}
              {remove && (
                <button onClick={deleteFunction}>
                  <AiOutlineDelete className='w-6 h-6' />
                </button>
              )}
              {add && (
                <button onClick={addFunction}>
                  <AiOutlinePlus className='w-6 h-6' />
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
