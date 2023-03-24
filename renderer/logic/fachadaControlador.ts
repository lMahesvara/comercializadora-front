import axios from 'axios'
import { ICliente } from '../types/ICliente'
import { IPedido } from '../types/IPedido'
import { IProducto } from '../types/IProducto'
import { IFachadaControlador } from './IFachadaControlador'

export class FachadaControlador implements IFachadaControlador {
  URI = process.env.API_URL
  PROXY_URI = process.env.PROXY_URL

  async getProductos(): Promise<IProducto[]> {
    try {
      const { data } = await axios.get(`${this.URI}/producto`)

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }
  async getClientes(): Promise<ICliente[]> {
    try {
      const { data } = await axios.get(`${this.URI}/cliente`)

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }
  async getPedidos(): Promise<IPedido[]> {
    try {
      const { data } = await axios.get(`${this.URI}/pedido`)

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async postPedido(pedido: IPedido): Promise<void> {
    try {
      console.log(pedido)
      await axios.post(`${this.PROXY_URI}/pedido`, pedido)
    } catch (error) {
      console.log(error)
    }
  }

  async putPedido(pedido: IPedido): Promise<void> {
    try {
      await axios.put(`${this.URI}/pedido/${pedido.id}`, pedido)
    } catch (error) {
      console.log(error)
    }
  }

  async deletePedido(id: number): Promise<void> {
    try {
      await axios.delete(`${this.PROXY_URI}/pedido/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
}
