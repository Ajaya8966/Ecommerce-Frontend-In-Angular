// import { Component, Input } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-user-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './user-form.component.html',
// })
// export class UserFormComponent {
//   @Input() editMode = false;
//   @Input() userData: any = null;

//   userForm: FormGroup;
//   selectedFile: File | null = null;

//   constructor(private fb: FormBuilder) {
//     this.userForm = this.fb.group({
//       id: [{ value: '', disabled: true }],
//       name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{3,50}$/)]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)]],
//       phone: ['', [Validators.required, Validators.pattern(/^9\d{9}$/)]],
//       address: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9,\s]{5,}$/)]],
//       userName: ['', [Validators.pattern(/^[A-Za-z._]{3,20}$/)]],
//       imageFile: [null],
//     });
//   }

//   ngOnInit() {
//     if (this.editMode && this.userData) {
//       this.userForm.patchValue({
//         id: this.userData.id,
//         name: this.userData.name,
//         email: this.userData.email,
//         phone: this.userData.phone,
//         address: this.userData.address,
//         userName: this.userData.userName,
//       });
//       this.userForm.get('password')?.clearValidators();
//       this.userForm.get('password')?.updateValueAndValidity();
//     }
//   }

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
//       this.selectedFile = file;
//     } else {
//       this.selectedFile = null;
//       this.userForm.get('imageFile')?.setErrors({ invalidFormat: true });
//     }
//   }

//   onSubmit() {
//     if (this.userForm.valid) {
//       const formData = new FormData();
//       Object.entries(this.userForm.getRawValue()).forEach(([key, value]) => {
//         if (key !== 'imageFile') {
//           formData.append(key, value as string);
//         }
//       });
//       if (this.selectedFile) {
//         formData.append('imageFile', this.selectedFile);
//       }

//       // Handle form submission, e.g., send to API
//       console.log('Form submitted', formData);
//     } else {
//       this.userForm.markAllAsTouched();
//     }
//   }
// }
