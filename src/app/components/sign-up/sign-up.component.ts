import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';
import { Router } from '@angular/router';
import { ValidateuserService } from '../../services/validateuser/validateuser.service';
import { ValidateUser } from 'src/app/dto/validateuser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  userNameTest: ValidateUser;

  constructor(private fb: FormBuilder, private serviceSignUp: SignUpService,
              private router: Router, private serviceValidate: ValidateuserService) {

    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    localStorage.removeItem('session');
    localStorage.removeItem('shopCart');
    localStorage.removeItem('token');
  }

  validateUser(userNombre: string) {
    this.serviceValidate.getValidateUserName(userNombre)
      .subscribe(dato => {
        this.userNameTest = dato;
        if (this.userNameTest.code === '01') {
          alert('El usuario ya se encuentra creado');
          this.signUpForm.reset();
        }
      }, error => {
        console.log('Error desde angular: ' + error);
      }, () => {
        console.log('Usuario validado');
      });
  }

  registerSession() {
    this.serviceSignUp.registerUser(this.signUpForm.value)
      .subscribe(dato => {
        this.router.navigate(['/login']);
      }, error => {
        console.log('Este es el error desde angular: ' + error);
      }, () => {
        console.log('Usuario creado Correctamente');
      });
  }

}
