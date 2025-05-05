import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api'; // Spring Boot backend URL

  constructor(private http: HttpClient) { }

  // registerUser(user: any): Observable<any> {
  //   return this.http.post(this.apiUrl, user);
  // }
  register(formData: FormData) {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }
}
