import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  users: any[] = [];
  success = '';
  error = '';
  selectedUserId: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('/api/admin/users').subscribe({
      next: data => this.users = data.filter(user => user.userRole.role !== 'ROLE_ADMIN'),
      error: err => this.error = 'Failed to load users.'
    });
  }

  confirmDelete(id: number) {
    this.selectedUserId = id;
  }

  deleteUser() {
    if (this.selectedUserId != null) {
      this.http.delete(`/api/admin/user/delete/${this.selectedUserId}`).subscribe({
        next: () => {
          this.success = 'User deleted successfully';
          this.loadUsers();
        },
        error: () => {
          this.error = 'Failed to delete user';
        }
      });
    }
  }

  addUser() {
    this.router.navigate(['/admin/user/add']);
  }

  editUser(id: number) {
    this.router.navigate([`/admin/user/edit/${id}`]);
  }
}
