import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  Login(): void {
    if (this.loginForm.invalid) {
      this.message = 'Please fill all fields correctly.';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.message = 'Login successful!';
        console.log('Logged in:', res);
        // redirect logic here
      },
      error: (err) => {
        this.message = 'Login failed. Check email and password.';
        console.error('Login error:', err);
      }
    });
  }
}
