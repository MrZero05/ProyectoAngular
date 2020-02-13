import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioSessionService {

  constructor(private http: HttpClient) { }

  iniciarSession(param: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/login', param);
  }

}
