import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  
Login(): void {
  if (this.loginForm.invalid) {
    this.message = 'Please enter a valid email and password.';
    this.loginForm.markAllAsTouched();
    return;
  }

  const { email, password } = this.loginForm.value;

  // Assuming your backend login endpoint is /api/auth/login
  this.http.post<{ token: string }>('/api/auth/login', { email, password })
    .subscribe({
      next: (res) => {
        // handle successful login (store token, redirect)
        // localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.message = 'Invalid username or password.';
      }
    });
}
}


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   message: string | null = null;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }

//   Login(): void {
//     if (this.loginForm.invalid) {
//       this.message = 'Please enter a valid email and password.';
//       this.loginForm.markAllAsTouched();
//       return;
//     }

//     const { email, password } = this.loginForm.value;

//     // Here you would normally call your auth service to authenticate
//     // For demo, let's assume a simple hardcoded check:
//     if (email === 'test@example.com' && password === 'Password123!') {
//       this.message = null;
//       // Redirect after successful login
//       this.router.navigate(['/dashboard']); // change route as needed
//     } else {
//       this.message = 'Invalid username or password.';
//     }
//   }
// }
