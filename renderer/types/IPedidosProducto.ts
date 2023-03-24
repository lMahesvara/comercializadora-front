import { IPedido } from './IPedido'
import { IProducto } from './IProducto'

export interface IPedidosProducto {
  id?: number
  cantidad: number
  producto: IProducto
  pedido?: IPedido
}
