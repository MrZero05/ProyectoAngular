import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterUser } from '../dto/register-user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) {}

  registerUser(regisuser: RegisterUser): Observable<any> {
    console.log('objeto desde service: ', regisuser);
    return this.http.post<any>('http://3.85.166.43:80/ecommerce/api/user/register', regisuser);
  }

}
