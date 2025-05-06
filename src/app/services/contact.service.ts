// contact.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact/submit';

  constructor(private http: HttpClient) {}

  sendMessage(contact: ContactMessage): Observable<any> {
    return this.http.post(this.apiUrl, contact, { responseType: 'text' });
  }
}
