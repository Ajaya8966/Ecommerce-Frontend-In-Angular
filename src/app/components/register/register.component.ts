import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  imageError: string | null = null;

  constructor(private fb: FormBuilder) {
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

  get name() { return this.registerForm.get('name')!; }
  get phone() { return this.registerForm.get('phone')!; }
  get address() { return this.registerForm.get('address')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }
  get confirmPassword() { return this.registerForm.get('confirmPassword')!; }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

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

  onSubmit(): void {
    if (this.registerForm.valid && this.imageFile) {
      const formData = new FormData();
      Object.keys(this.registerForm.controls).forEach(key => {
        if (key !== 'confirmPassword') {
          formData.append(key, this.registerForm.get(key)?.value);
        }
      });
      formData.append('imageFile', this.imageFile);

      // Replace with actual API call
      console.log('Form Data Submitted:', formData);
    }
  }
}
