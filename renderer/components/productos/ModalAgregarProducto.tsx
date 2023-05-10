import { toast } from 'react-toastify'
import Button from '../Button'
import { useRef } from 'react'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { ICliente } from '../../types/ICliente'
import { useRouter } from 'next/router'
import { IProducto } from '../../types/IProducto'

type ModalAgregarProductoProps = {
  toggle: () => void
}

const ModalAgregarProducto = ({ toggle }: ModalAgregarProductoProps) => {
  const formRef = useRef(null)
  const router = useRouter()

  const agregarProducto = () => {
    if (checkForm()) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())

      const fachadaControlador: IFachadaControlador = new FachadaControlador()
      const producto = {
        nombre: data.nombre as string,
        precio: Number(data.precio),
        cantidad: 0,
        cantidadApartada: 0,
      } as IProducto

      fachadaControlador.postProducto(producto).then(_ => {
        toast.success('Producto agregado')
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
        <h3 className='text-2xl font-bold text-center'>Agregar producto</h3>
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
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='precio'>Precio (Kg)</label>
            <input
              type='text'
              id='precio'
              name='precio'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
            />
          </div>
          <div className='flex flex-row-reverse items-center justify-between mt-2'>
            <Button onClick={agregarProducto}>Agregar</Button>
            <Button onClick={toggle}>Cancelar</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ModalAgregarProducto
