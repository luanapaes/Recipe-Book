import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MsgSnackbar } from '../../shared/msg-snackbar/msg-snackbar';
import { MsgSnackBarService } from '../../shared/services/msg-snackbar.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  snackbarService = inject(MsgSnackBarService)

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      const login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(login.email, login.password).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.accessToken)
          this.snackbarService.openSnackBar("Entrando..")
          setTimeout(() => {
            this.router.navigate(['recipes'])
          }, 900)
        }, 
        error: (e) => {
          this.snackbarService.openSnackBar("E-mail ou senha incorretos.")
        }
      })
    }
  }
}
