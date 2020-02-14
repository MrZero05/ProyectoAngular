import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioSessionService {
  public userLoggedIn: string;

  constructor(private http: HttpClient) {
    this.userLoggedIn = this.getlocalSession();
  }

  iniciarSession(param: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/login', param);
  }

  logOut(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/user/logout');
  }

  saveSessionLocaly(session: string) {
    localStorage.setItem('session', session);
    this.userLoggedIn = this.getlocalSession();
  }

  getlocalSession(): string {
    if ( localStorage.getItem('session') == null ) {
      return null;
    }
    return localStorage.getItem('session');
  }

}
