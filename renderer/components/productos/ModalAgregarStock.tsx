import { toast } from 'react-toastify'
import Button from '../Button'
import { useRef } from 'react'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { useRouter } from 'next/router'
import { IProducto } from '../../types/IProducto'

type ModalAgregarStockProps = {
  toggle: () => void
  producto: IProducto
}

const ModalAgregarStock = ({ toggle, producto }: ModalAgregarStockProps) => {
  const formRef = useRef(null)
  const router = useRouter()

  const agregarStock = () => {
    if (checkForm()) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())

      const fachadaControlador: IFachadaControlador = new FachadaControlador()
      const newProducto = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad + Number(data.cantidad),
        cantidadApartada: producto.cantidadApartada,
      } as IProducto

      fachadaControlador.putProducto(newProducto).then(_ => {
        toast.success('Stock agregado')
        router.reload()
      })
    }
  }

  const checkForm = () => {
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    if (!data.cantidad) {
      toast.error('La cantidad es requerida')
      return false
    }
    return true
  }

  return (
    <section className='absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
      <div className='p-4 bg-[#1b2b44] rounded-xl w-80 h-56'>
        <h3 className='text-2xl font-bold text-center'>Agregar Stock</h3>
        <form
          className='flex flex-col gap-4 mt-4'
          ref={formRef}
          onSubmit={e => e.preventDefault()}
        >
          <div className='flex flex-col gap-2'>
            <label htmlFor='cantidad'>Cantidad (Kg)</label>
            <input
              type='text'
              id='cantidad'
              name='cantidad'
              className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') agregarStock()
                if (e.key === 'Escape') toggle()
              }}
            />
          </div>
          <div className='flex flex-row-reverse items-center justify-between mt-2'>
            <Button onClick={agregarStock}>Agregar</Button>
            <Button onClick={toggle}>Cancelar</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ModalAgregarStock
