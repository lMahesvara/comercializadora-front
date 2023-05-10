import { toast } from 'react-toastify'
import Button from '../Button'
import { useRef } from 'react'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { ICliente } from '../../types/ICliente'
import { useRouter } from 'next/router'
import { IProducto } from '../../types/IProducto'

type ModalEditarProductoProps = {
  toggle: () => void
  producto: IProducto
}

const ModalEditarProducto = ({
  toggle,
  producto,
}: ModalEditarProductoProps) => {
  const formRef = useRef(null)
  const router = useRouter()

  const editarCliente = () => {
    if (checkForm()) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())

      const fachadaControlador: IFachadaControlador = new FachadaControlador()
      const newProducto = {
        id: producto.id,
        nombre: data.nombre as string,
        precio: Number(data.precio),
        cantidad: producto.cantidad,
        cantidadApartada: producto.cantidadApartada,
      } as IProducto

      fachadaControlador.putProducto(newProducto).then(_ => {
        toast.success('Producto editado')
        router.reload()
      })
    }
  }

  const checkForm = () => {
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    if (!data.nombre) {
      toast.error('El nombre es requerido')
      return false
    }
    if (!data.precio) {
      toast.error('El precio es requerido')
      return false
    }
    return true
  }

  return (
    <section className='absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
      <div className='p-4 bg-[#1b2b44] rounded-xl w-80 h-80'>
        <h3 className='text-2xl font-bold text-center'>Editar Producto</h3>
        <form
          className='flex flex-col gap-4 mt-4'
          ref={formRef}
          onSubmit={e => e.preventDefault()}
        >
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Nombre</label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
              defaultValue={producto.nombre}
              autoFocus
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='precio'>Precio</label>
            <input
              type='text'
              id='precio'
              name='precio'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
              defaultValue={producto.precio.toString()}
            />
          </div>

          <div className='flex flex-row-reverse items-center justify-between mt-4'>
            <Button onClick={editarCliente}>Editar</Button>
            <Button onClick={toggle}>Cancelar</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ModalEditarProducto
