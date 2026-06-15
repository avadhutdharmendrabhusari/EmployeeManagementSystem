import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
  email: [
    '',
    [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      )
    ]
  ],

  password: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$'
      )
    ]
  ]
});

  }

  onSubmit() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.authService
      .login(this.loginForm.value)
      .subscribe({

        next: (response: any) => {

          console.log(
            'LOGIN RESPONSE =>',
            response
          );

          localStorage.setItem(
            'token',
            response.token
          );

          localStorage.setItem(
            'role',
            response.roleName
          );

         Swal.fire({
  icon: 'success',
  title: 'Welcome',
  text: 'Login Successfully',
  timer: 1500,
  showConfirmButton: false
});

          if (
            response.roleName === 'Admin'
          ) {

            this.router.navigate(
              ['/dashboard']
            );

          }
          else {

            this.router.navigate(
              ['/profile']
            );

          }

        },

        error: (error) => {

          console.log(error);

          alert(
            'Invalid Email Or Password'
          );

        }

      });

  }

}