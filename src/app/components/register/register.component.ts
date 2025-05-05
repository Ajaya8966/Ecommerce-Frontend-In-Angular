import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{3,50}$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^9\d{9}$/)]],
        address: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9,\s]{5,}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Getters for form fields
  get name() { return this.registerForm.get('name')!; }
  get phone() { return this.registerForm.get('phone')!; }
  get address() { return this.registerForm.get('address')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }
  get confirmPassword() { return this.registerForm.get('confirmPassword')!; }

  // Custom validator for password match
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Image upload logic
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
      this.imageFile = file;
      this.imageError = null;

      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    } else {
      this.imageFile = null;
      this.imagePreview = null;
      this.imageError = 'Image must be JPG, JPEG, or PNG format.';
    }
  }

  // Submit form
  onSubmit(): void {
    if (this.registerForm.valid && this.imageFile) {
      const formData = new FormData();

      Object.keys(this.registerForm.controls).forEach(key => {
        if (key !== 'confirmPassword') {
          formData.append(key, this.registerForm.get(key)?.value);
        }
      });

      formData.append('imageFile', this.imageFile);

      this.userService.register(formData).subscribe({
        next: (res) => {
          alert('User successfully registered!');
          this.router.navigate(['/login']); // Redirect after success
        },
        error: (err) => {
          alert('Registration failed: ' + (err.error?.message || 'Server error'));
        }
      });
    }
  }
}
