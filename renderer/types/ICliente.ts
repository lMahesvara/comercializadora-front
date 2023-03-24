import { IPedido } from './IPedido'

export interface ICliente {
  id?: number
  nombre: string
  apellido: string
  pedidos?: IPedido[]
}
