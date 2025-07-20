// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/api/login'; // points to Spring Boot backend

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  return this.http.post('http://localhost:8080/login', formData, {
    withCredentials: true,
    observe: 'response' // optional, if you want to inspect headers/status
  });
}


  // login(email: string, password: string): Observable<any> {
  //   const body = new URLSearchParams();
  //   body.set('email', email); // match backend usernameParameter
  //   body.set('password', password); // match backend passwordParameter

  //   const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  //   return this.http.post(this.loginUrl, body.toString(), {
  //     headers: headers,
  //     withCredentials: true // needed for session-based auth
  //   });
  }
