export interface Product {
  prodId: string;
  prodNombre: string;
  prodDescription: string;
  prodCategory: string;
  prodPrecio: number;
  prodImageMain: string;
  prodImage: string;
  promId: {
    promPorcetaje: number;
    prom: string;
  }
}
