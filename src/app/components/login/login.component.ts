import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // ✅ Create form group after fb is available
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  Login(): void {
    if (this.loginForm.valid) {
      const body = new URLSearchParams();
      body.set('email', this.loginForm.value.username!);
      body.set('password', this.loginForm.value.password!);

      this.http.post('/login', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      }).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.message = 'Invalid email or password';
        }
      });
    }
  }
}
