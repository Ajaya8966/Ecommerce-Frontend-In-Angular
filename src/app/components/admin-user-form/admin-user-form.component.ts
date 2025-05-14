import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-user-form.component.html'
})
export class AdminUserFormComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);

  editMode = signal(false);
  previewUrl = signal('');
  userForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    imageFile: [null],
    old: ['']
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode.set(true);
      this.userService.getUserById(id).subscribe(user => {
        this.userForm.patchValue(user);
        this.previewUrl.set(user.photoUrl);
      });
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.userForm.patchValue({ imageFile: file });
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  submit() {
    const formData = new FormData();
    Object.entries(this.userForm.value).forEach(([key, val]) =>
      formData.append(key, val as any)
    );

    if (this.editMode()) {
      this.userService.updateUser(formData).subscribe(() => this.router.navigate(['/admin/users']));
    } else {
      this.userService.addUser(formData).subscribe(() => this.router.navigate(['/admin/users']));
    }
  }

  resetForm() {
    this.userForm.reset();
    this.previewUrl.set('');
  }
}
