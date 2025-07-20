import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule]
})
export class UserDashboardComponent implements OnInit {

  featuredProducts: any[] = [];

  categories = [
    { name: 'Phone', image: 'assets/Phone1.jpg' },
    { name: 'Laptop', image: 'assets/05.jpg' },
    { name: 'Camera', image: 'assets/Camera.jpg' },
    { name: 'Groceries', image: 'assets/grocery.jpg' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getFeaturedProducts().subscribe({
      next: (res) => this.featuredProducts = res,
      error: (err) => console.error('Error fetching featured products', err)
    });
  }
}
