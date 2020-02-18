import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidateUser } from 'src/app/dto/validateuser';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ValidateuserService {

  constructor(private http: HttpClient) { }

  getValidateUserName(userNombre: string): Observable<ValidateUser> {
    console.log(userNombre);
    return this.http.get<ValidateUser>('http://3.85.166.43:80/ecommerce/api/user/validatoruser/' + userNombre);
  }
}
