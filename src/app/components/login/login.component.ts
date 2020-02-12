import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { InicioSessionService } from '../../services/inicioSession/inicio-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;


  constructor(private fb: FormBuilder, private serviceInicio: InicioSessionService ) {
    this.myForm = new FormGroup({
      userNombre: new FormControl(null, [Validators.required, Validators.min(2)]),
      userPassword: new FormControl(null, Validators.required)
    });

   }

  ngOnInit() {
  }


  iniciarSession() {
    console.log('formulario: ', this.myForm.value);
    this.serviceInicio.iniciarSession(this.myForm.value).subscribe(dato => {

      console.log('formulario2: ', this.myForm.value);
      sessionStorage.setItem('token', dato.token);
    }, error => {
      console.log(error);
    }, () => {
      console.log('completado');
    });
  }

}
