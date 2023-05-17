import axios from 'axios'
import { ICliente } from '../types/ICliente'
import { IPedido } from '../types/IPedido'
import { IProducto } from '../types/IProducto'
import { IFachadaControlador } from './IFachadaControlador'
import { IVenta } from '../types/IVenta'

export class FachadaControlador implements IFachadaControlador {
  URI = process.env.API_URL

  async getProductos(): Promise<IProducto[]> {
    try {
      const { data } = await axios.get(`${this.URI}/productos`)

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }
  async getClientes(): Promise<ICliente[]> {
    try {
      const { data } = await axios.get(`${this.URI}/clientes`)

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }
  async getPedidos(): Promise<IPedido[]> {
    try {
      const { data } = await axios.get(`${this.URI}/pedidos`)

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async getPedido(id: number): Promise<IPedido> {
    try {
      const { data } = await axios.get(`${this.URI}/pedidos/${id}`)
      return data
    } catch (error) {
      console.log(error)
      return {} as IPedido
    }
  }

  async postPedido(pedido: IPedido): Promise<void> {
    try {
      console.log(pedido)
      await axios.post(`${this.URI}/pedidos`, pedido)
    } catch (error) {
      console.log(error)
    }
  }

  async postCliente(cliente: ICliente): Promise<void> {
    try {
      await axios.post(`${this.URI}/clientes`, cliente)
    } catch (error) {
      console.log(error)
    }
  }

  async postProducto(producto: IProducto): Promise<void> {
    try {
      await axios.post(`${this.URI}/productos`, producto)
    } catch (error) {
      console.log(error)
    }
  }

  async postVenta(venta: IVenta): Promise<void> {
    try {
      await axios.post(`${this.URI}/ventas`, venta)
    } catch (error) {
      console.log(error)
    }
  }

  async putPedido(pedido: IPedido): Promise<void> {
    try {
      await axios.put(`${this.URI}/pedidos`, pedido)
    } catch (error) {
      console.log(error)
    }
  }

  async putCliente(cliente: ICliente): Promise<void> {
    try {
      await axios.put(`${this.URI}/clientes`, cliente)
    } catch (error) {
      console.log(error)
    }
  }

  async putProducto(producto: IProducto): Promise<void> {
    try {
      await axios.put(`${this.URI}/productos`, producto)
    } catch (error) {
      console.log(error)
    }
  }

  async deletePedido(id: number): Promise<void> {
    try {
      await axios.delete(`${this.URI}/pedidos/${id}`)
    } catch (error) {
      console.log(error)
      throw new Error('No se puede eliminar el pedido')
    }
  }

  async deleteCliente(id: number): Promise<void> {
    try {
      await axios.delete(`${this.URI}/clientes/${id}`).then(res => {
        console.log(res.status)
      })
    } catch (error) {
      throw new Error('No se puede eliminar el cliente')
    }
  }
}
