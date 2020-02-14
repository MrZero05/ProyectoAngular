import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterUser } from '../dto/register-user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) {}

  registerUser(regisuser: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/user/register', regisuser);
  }

}
