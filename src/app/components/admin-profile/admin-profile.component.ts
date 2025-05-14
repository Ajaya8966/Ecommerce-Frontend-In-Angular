import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  user: any = {
    id: 1,
    name: 'Admin Name',
    email: 'admin@example.com',
    photo: 'images/admin.jpg',
  };

  cp: string = '/your-context-path'; // Replace with actual context path
  successMessage = '';
  errorMessage = '';
  showModal = false;

  changePassForm = this.fb.group({
    cpass: ['', Validators.required],
    npass: ['', Validators.required],
  });

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.changePassForm.reset();
  }

  changePassword() {
    if (this.changePassForm.invalid) return;

    const url = `${this.cp}/admin/changepass/${this.user.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add CSRF token if needed, e.g. 'X-CSRF-TOKEN': this.csrfToken
    });

    this.http.post(url, this.changePassForm.value, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully.';
        this.errorMessage = '';
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage = 'Failed to change password.';
        this.successMessage = '';
      }
    });
  }

  editProfile() {
    this.router.navigate([`${this.cp}/admin/edit/${this.user.id}`]);
  }
}
