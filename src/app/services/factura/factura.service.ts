import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleFactura } from '../../dto/detalleFactura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }


  crearFactura(param: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/factura/register', param);
  }
}
