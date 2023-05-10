import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Button from '../Button'
import { IPedido } from '../../types/IPedido'
import { currencyFormatter } from '../../utils/formatters'
import { toast } from 'react-toastify'
import { FachadaControlador } from '../../logic/fachadaControlador'
import { IFachadaControlador } from '../../logic/IFachadaControlador'
import { IVenta } from '../../types/IVenta'

type ModalPagarCreditoProps = {
  toggle: () => void
  pedido: IPedido
  pagoCompleto?: boolean
}

const ModalPagarVenta = ({
  toggle,
  pedido,
  pagoCompleto,
}: ModalPagarCreditoProps) => {
  const [monto, setMonto] = useState(pagoCompleto ? pedido.saldo : 0)
  const formRef = useRef(null)
  const router = useRouter()
  const height = pagoCompleto ? 'h-72' : 'h-80'

  const handleSubmit = () => {
    if (checkForm()) {
      const fachadaControlador: IFachadaControlador = new FachadaControlador()

      pedido.ventas = undefined
      pedido.pedidosProducto = undefined

      const venta = {
        fechaVenta: new Date().toISOString(),
        idPedido: pedido,
        precioVenta: monto,
      } as IVenta

      console.log(JSON.stringify(venta))

      fachadaControlador.postVenta(venta).then(_ => {
        toast.success('Venta registrada!')
        router.push('/ventas')
      })
    }
  }

  const checkForm = () => {
    if (monto === 0) {
      toast.error('El monto debe ser mayor a 0')
      return false
    }
    if (monto > pedido.precioTotal) {
      toast.error('El monto debe ser menor o igual al saldo')
      return false
    }
    return true
  }

  return (
    <section className='absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
      <div className={`p-4 bg-[#1b2b44] rounded-xl w-80 ${height}`}>
        <h3 className='text-2xl font-bold text-center'>Monto a pagar</h3>
        <form
          className='flex flex-col gap-4 mt-4 '
          ref={formRef}
          onSubmit={e => e.preventDefault()}
        >
          {pagoCompleto ? (
            <label htmlFor='monto' className='text-lg font-bold'>
              Monto: {currencyFormatter.format(monto)}
            </label>
          ) : (
            <div className='flex flex-col gap-2'>
              <label htmlFor='monto' className='text-lg font-bold'>
                Monto:
              </label>
              <input
                type='number'
                id='monto'
                name='monto'
                defaultValue={monto}
                className='p-2 text-sm bg-[#ededed] text-black rounded-lg'
                onChange={e => setMonto(Number(e.target.value))}
              />
            </div>
          )}
          <label htmlFor='saldo' className='text-lg font-bold'>
            Saldo actual: {currencyFormatter.format(pedido.saldo)}
          </label>
          <hr className='font-bold ' />
          <label htmlFor='saldo' className='text-lg font-bold'>
            Nuevo saldo: {currencyFormatter.format(pedido.saldo - monto)}
          </label>
          <div className='flex flex-row-reverse items-center justify-between mt-2'>
            <Button onClick={handleSubmit}>Pagar</Button>
            <Button onClick={toggle}>Cancelar</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ModalPagarVenta
