import { ICliente } from '../types/ICliente'
import { IPedido } from '../types/IPedido'
import { IProducto } from '../types/IProducto'
import { IVenta } from '../types/IVenta'

export interface IFachadaControlador {
  getProductos(): Promise<IProducto[]>
  getClientes(): Promise<ICliente[]>
  getPedidos(): Promise<IPedido[]>
  getPedido(id: number): Promise<IPedido>
  postPedido(pedido: IPedido): Promise<void>
  postCliente(cliente: ICliente): Promise<void>
  postProducto(producto: IProducto): Promise<void>
  postVenta(venta: IVenta): Promise<void>
  putPedido(pedido: IPedido): Promise<void>
  putCliente(cliente: ICliente): Promise<void>
  putProducto(producto: IProducto): Promise<void>
  deletePedido(id: number): Promise<void>
  deleteCliente(id: number): Promise<void>
}
