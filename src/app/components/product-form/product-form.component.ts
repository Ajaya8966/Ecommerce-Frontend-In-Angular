import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  categories = [
    { id: 1, name: 'Phone' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Camera' },
    { id: 4, name: 'Groceries' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      category: ['', Validators.required],
      cp: ['', [Validators.required, Validators.min(0)]],
      sp: ['', [Validators.required, Validators.min(0)]],
      qty: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageFile: [null, Validators.required]
    });

    // If editing, populate the form with existing product data
    // this.loadProductData();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.entries(this.productForm.value).forEach(([key, value]) => {
  if (value instanceof Blob) {
    formData.append(key, value);
  } else if (typeof value === 'string' || typeof value === 'number') {
    formData.append(key, value.toString());
  }
});


      // Object.entries(this.productForm.value).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      if (this.isEditMode) {
        // Call update product service
      } else {
        // Call add product service
      }
    }
  }

  onReset(): void {
    this.productForm.reset();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ imageFile: file });
    }
  }
}
