import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api'; // Spring Boot backend URL

  constructor(private http: HttpClient) { }

  // For user registration
  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  // Fetch all admins/users
  getAllAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/list`);
  }

  // Get a single user by ID (for edit)
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/edit/${id}`);
  }

  // Add a new admin
  addUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/add`, formData);
  }

  // Update existing admin
  updateUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/edit`, formData);
  }

  // Delete user by ID
  deleteUser(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/delete/${id}`, {});
  }
}
