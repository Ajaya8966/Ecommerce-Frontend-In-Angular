import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  productId: number | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the product ID from the route
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.fetchProductDetails(this.productId);
    }
  }

  fetchProductDetails(id: number): void {
    this.http.get(`/api/product/${id}`) // Ensure your backend API endpoint is correct
      .subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Failed to load product details', err);
        }
      });
  }
}
