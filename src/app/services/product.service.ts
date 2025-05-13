import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = '/api/admin/product';

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  
  getFeaturedProducts(): Observable<any[]> {
  return this.http.get<any[]>('/api/products/featured');
}

}
