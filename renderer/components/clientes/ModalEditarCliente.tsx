import { toast } from 'react-toastify'
import Button from '../Button'
import { useRef } from 'react'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { ICliente } from '../../types/ICliente'
import { useRouter } from 'next/router'

type ModalEditarClienteProps = {
  toggle: () => void
  cliente: ICliente
}

const ModalEditarCliente = ({ toggle, cliente }: ModalEditarClienteProps) => {
  const formRef = useRef(null)
  const router = useRouter()

  const editarCliente = () => {
    if (checkForm()) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())

      const fachadaControlador: IFachadaControlador = new FachadaControlador()
      const updateCliente: ICliente = {
        id: cliente.id,
        nombre: data.nombre as string,
        apellido: data.apellido as string,
        apodo: data.apodo as string,
        adeudo: cliente.adeudo,
      }
      fachadaControlador.putCliente(updateCliente).then(_ => {
        toast.success('Cliente editado!')
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
        <h3 className='text-2xl font-bold text-center'>Editar cliente</h3>
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
              defaultValue={cliente.nombre}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='apellido'>Apellido</label>
            <input
              type='text'
              id='apellido'
              name='apellido'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
              defaultValue={cliente.apellido}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='apodo'>Apodo</label>
            <input
              type='text'
              id='apodo'
              name='apodo'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
              defaultValue={cliente.apodo || ''}
            />
          </div>
          <div className='flex items-center justify-between mt-2'>
            <Button onClick={toggle}>Cancelar</Button>
            <Button onClick={editarCliente}>Editar</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ModalEditarCliente
