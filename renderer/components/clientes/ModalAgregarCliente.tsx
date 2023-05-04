import { toast } from 'react-toastify'
import Button from '../Button'
import { useRef } from 'react'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { ICliente } from '../../types/ICliente'
import { useRouter } from 'next/router'

type ModalAgregarClienteProps = {
  toggle: () => void
}

const ModalAgregarCliente = ({ toggle }: ModalAgregarClienteProps) => {
  const formRef = useRef(null)
  const router = useRouter()

  const agregarCliente = () => {
    if (checkForm()) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())

      const fachadaControlador: IFachadaControlador = new FachadaControlador()
      const cliente: ICliente = {
        nombre: data.nombre as string,
        apellido: data.apellido as string,
        apodo: data.apodo as string,
        adeudo: 0,
      }
      fachadaControlador.postCliente(cliente).then(_ => {
        toast.success('Cliente agregado')
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
    if (!data.apellido) {
      toast.error('El apellido es requerido')
      return false
    }
    if (!data.apodo) {
      toast.error('El apodo es requerido')
      return false
    }
    return true
  }

  return (
    <section className='absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
      <div className='p-4 bg-[#1b2b44] rounded-xl w-80 h-96'>
        <h3 className='text-2xl font-bold text-center'>Agregar cliente</h3>
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
            <label htmlFor='apellido'>Apellido</label>
            <input
              type='text'
              id='apellido'
              name='apellido'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='apodo'>Apodo</label>
            <input
              type='text'
              id='apodo'
              name='apodo'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
            />
          </div>
          <div className='flex flex-row-reverse items-center justify-between mt-2'>
            <Button onClick={agregarCliente}>Agregar</Button>
            <Button onClick={toggle}>Cancelar</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ModalAgregarCliente
