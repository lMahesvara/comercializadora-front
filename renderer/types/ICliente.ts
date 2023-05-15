import { IPedido } from './IPedido'

export interface ICliente {
  id?: number
  nombre: string
  apellido: string
  apodo: string
  adeudo?: number
  pedidos?: IPedido[]
}
