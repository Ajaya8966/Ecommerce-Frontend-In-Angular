import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Registration using JSON
  // register(user: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/addUser`, user);
  // }

  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', email); // Spring Security expects "username"
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http.post(`${this.baseUrl}/login`, body.toString(), {
      headers,
      withCredentials: true, // to send the JSESSIONID cookie
      responseType: 'text'   // or 'json' if you're returning a custom object
    });
  }
}
