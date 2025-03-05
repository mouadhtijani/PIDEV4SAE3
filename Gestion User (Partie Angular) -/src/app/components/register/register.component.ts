import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/services/models';
import { AuthenticationControllerService } from 'src/app/services/services';
import { environment } from 'src/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  userImageuri: string = "../assets/images/register_image.png";
  selectedFile: File | null = null;
  myrole: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registerService: AuthenticationControllerService,
    private http: HttpClient
  ) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.myrole = params['value'];
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImageuri = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  save() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.registerForm.invalid || !this.selectedFile) {
      if (!this.selectedFile) {
        this.errorMessage = 'Profile image is required';
      }
      return;
    }

    const formData = new FormData();
    formData.append("userImage", this.selectedFile);
    formData.append("firstName", this.registerForm.value.firstName);
    formData.append("lastName", this.registerForm.value.lastName);
    formData.append("email", this.registerForm.value.email);
    formData.append("password", this.registerForm.value.password);
    formData.append("role", this.myrole);

    this.http.post<User>(`${environment.apiUrl}/api/v1/auth/register`, formData).subscribe({
      next: (response) => {
        localStorage.setItem('id_user', response.userId!.toString());
        localStorage.setItem('role', this.myrole);
        this.router.navigate(['activate-account'], { queryParams: { value: this.myrole } });
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error?.message || 'Registration failed';
      }
    });
  }
}