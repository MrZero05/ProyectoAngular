import { Injectable } from '@angular/core';
import { Product } from '../dto/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductByCategory(category: string): Observable<Product[]> {
    // call service api for product list filter y category
    console.log(category);
    return this.http.get<Product[]>('http://3.85.166.43:80/ecommerce/api/producto/listProducto/' + category);
  }

  getProductById(id: string): Observable<Product> {
    // Call service Api to bring a list of product fitlered by id
    return this.http.get<Product>('http://3.85.166.43:80/ecommerce/api/producto/getProducto/' + id);
  }

  getPromoProducts(): Observable<Product[]> {
    // Call service Api to bring a list of promotional product
    return this.http.get<Product[]>('http://3.85.166.43:80/ecommerce/api/producto/promoProductList');
  }
}
