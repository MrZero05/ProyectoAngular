import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }


  crearFactura(param: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/factura/register', param);
  }
}
