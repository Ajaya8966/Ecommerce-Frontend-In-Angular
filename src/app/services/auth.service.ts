import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/signup';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post(`${this.baseUrl}/login`, formData, {
      withCredentials: true,
      observe: 'response'
    });
  }
}
