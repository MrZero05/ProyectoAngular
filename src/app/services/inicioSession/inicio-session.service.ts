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

    param.token = 'Bearer  eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIkFETUlOXCJ9XSIsInN1YiI6InNlcmdpbyIsImlhdCI6MTU4MTYwMzg0MywiZXhwIjoxNTgxNjA3NDQzfQ.SJzLLdzUSbYdDBXTK87LqISyKF8UChaydTyQYe3QNDRQyviUS5p4GfB3cDMtBTRZ5kaWemrqKf3K4juFCeFX7A';
    console.log(param);
    return this.http.post<InicioSessionDTO>('http://my-json-server.typicode.com/brayan1119/curso-angular/login', param);

    //return this.http.post<any>('http://192.168.1.3:8080/api/login', param);
  }
}
