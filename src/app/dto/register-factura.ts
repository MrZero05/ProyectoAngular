import { DetalleFactura } from './detalleFactura';

export interface RegisterFactura {
  factEstado: string;
  factFecha: Date;
  userName: string;
  listDetalleFactura: DetalleFactura[];
  /* listDetalleFactura: [{
  detfactId: number;
  detfactCantidad: number;
  detfactValor: number;
  factId: number;
  prodId: number;
  }]; */
}
