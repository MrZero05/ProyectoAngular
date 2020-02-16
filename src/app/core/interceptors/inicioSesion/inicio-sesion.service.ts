import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InicioSesionService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('mensaje desde inicio-sesion: ', req.url);

    const token = sessionStorage.getItem('token');

    if (token) {
      const reqClone = req.clone({ headers: new HttpHeaders({token})});
      return next.handle(reqClone);
    } else {
      return next.handle(req);
    }




  }
}
