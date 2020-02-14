import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private service: SignUpService, private router: Router) {

    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   }

  ngOnInit() {
  }

  registerSession() {
    this.service.registerUser(this.signUpForm.value)
    .subscribe(dato => {
      this.router.navigate(['/layout/login']);
    }, error => {
      console.log('Este es el error desde angular: ' + error);
    }, () => {
      console.log('Usuario creado Correctamente');
    });
  }

}
