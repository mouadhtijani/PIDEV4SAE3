import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationControllerService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    localStorage.setItem("id_user", '');
    localStorage.setItem("role", '');
    localStorage.setItem("token", '');
  }

  get f() {
    return this.loginForm.controls;
  }

  goToSupervisorRegister() {
    this.router.navigate(['/register'], { queryParams: { value: 'SUPERVISOR' } });
  }

  goToStudentRegister() {
    this.router.navigate(['/register'], { queryParams: { value: 'STUDENT' } });
  }

  authenticate() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    const authRequest: AuthenticationRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.http.post<any>(`${environment.apiUrl}/api/v1/auth/authenticate`, authRequest)
      .subscribe({
        next: (res) => {
          localStorage.setItem("id_user", res.userID);
          localStorage.setItem("role", res.userRole);
          localStorage.setItem("token", res.token);
          
          if (res.userRole === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/homepage']);
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Invalid credentials';
          console.error('Authentication error:', err);
        }
      });
  }
}