import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list', 
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  success: string | null = null;
  error: string | null = null;
  deleteId: number | null = null;

  private productService = inject(ProductService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => this.products = res,
      error: () => this.error = 'Failed to fetch products'
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
  }

  deleteProduct() {
    if (this.deleteId != null) {
      this.productService.deleteProduct(this.deleteId).subscribe({
        next: () => {
          this.success = 'Product deleted successfully';
          this.loadProducts();
          this.deleteId = null;
        },
        error: () => this.error = 'Delete failed'
      });
    }
  }
}
