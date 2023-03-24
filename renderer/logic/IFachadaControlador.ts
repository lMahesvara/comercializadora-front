import { ICliente } from '../types/ICliente'
import { IPedido } from '../types/IPedido'
import { IProducto } from '../types/IProducto'

export interface IFachadaControlador {
  getProductos(): Promise<IProducto[]>
  getClientes(): Promise<ICliente[]>
  getPedidos(): Promise<IPedido[]>
  postPedido(pedido: IPedido): Promise<void>
  putPedido(pedido: IPedido): Promise<void>
  deletePedido(id: number): Promise<void>
}
