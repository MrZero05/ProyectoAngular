import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { InicioSessionService } from '../../services/inicioSession/inicio-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  myForm: FormGroup;


  constructor(private fb: FormBuilder, private serviceInicio: InicioSessionService, private router: Router ) {
    this.myForm = new FormGroup({
      userNombre: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      userPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

   }

  ngOnInit() {
  }


  iniciarSession() {
    this.serviceInicio.iniciarSession(this.myForm.value)
    .subscribe(dato => {
      localStorage.setItem('token', dato.token);
      this.serviceInicio.saveSessionLocaly(dato.user.username);
      this.router.navigate(['/layout/home']);
    }, error => {
      this.error = error.error.mensaje;
    }, () => {
      console.log('Inició  Session Correctamente');
    });
  }

}
