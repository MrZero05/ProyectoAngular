export interface RegisterFactura {
  factEstado: string;
  factFecha: Date;
  userName: string;
  listDetalleFactura: [{
  detfactId: number;
  detfactCantidad: number;
  detfactValor: number;
  factId: number;
  prodId: number;
  }];
}
