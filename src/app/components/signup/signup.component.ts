
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  apiUrl = 'http://localhost:8080/api/signup'; // ✅ Replace with your backend API URL

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    // Post form data to backend
    this.http.post(this.apiUrl, this.signupForm.value).subscribe({
      next: (res) => {
        console.log('Signup successful', res);
        alert('Signup successful!');
        this.router.navigate(['/login']); // Navigate to login page
      },
      error: (err) => {
        console.error('Signup failed', err);
        alert('Signup failed. Please try again.');
      }
    });
  }
}