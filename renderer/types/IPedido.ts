import { ICliente } from './ICliente'
import { IPedidosProducto } from './IPedidosProducto'

export interface IPedido {
  id?: number
  cliente: ICliente
  precioTotal: number
  fecha: string
  lugarEntrega: string
  pedidosProducto: IPedidosProducto[]
  observaciones: string
  pagado?: boolean
}
