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
    return this.http.get<Product[]>('http://172.19.12.163:3000/products');
  }
}
