import { IPedido } from './IPedido'

export interface IVenta {
  id?: number
  precioVenta: number
  fechaVenta: string
  idPedido: IPedido
}
