import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InicioSessionDTO } from '../../dto/inicio-session-dto';

@Injectable({
  providedIn: 'root'
})
export class InicioSessionService {

  constructor(private http: HttpClient) { }

  iniciarSession(param: any): Observable<InicioSessionDTO>{
     return this.http.post<any>('http://localhost:8080/api/login', param);
  }
}
