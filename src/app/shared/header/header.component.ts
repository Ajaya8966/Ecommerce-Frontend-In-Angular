import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule for *ngIf

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], // ✅ Make sure this is included
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.http.get('/api/profile', {
      withCredentials: true,
      responseType: 'text'
    }).subscribe({
      next: () => this.isLoggedIn = true,
      error: () => this.isLoggedIn = false
    });
  }

  logout() {
    this.http.post('/logout', {}, { withCredentials: true }).subscribe(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    });
  }
}
