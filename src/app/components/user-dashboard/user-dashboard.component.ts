import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
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

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(data => {
      this.featuredProducts = data;
    });
  }
}
