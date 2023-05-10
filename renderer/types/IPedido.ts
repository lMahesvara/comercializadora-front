import { ICliente } from './ICliente'
import { IPedidosProducto } from './IPedidosProducto'
import { IVenta } from './IVenta'

export interface IPedido {
  id?: number
  cliente: ICliente
  precioTotal: number
  saldo: number
  fecha: string
  lugarEntrega: string
  pedidosProducto: IPedidosProducto[]
  observaciones: string
  pagado?: boolean
  ventas?: IVenta[]
}
