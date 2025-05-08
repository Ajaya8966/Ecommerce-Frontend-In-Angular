import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-category',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  categories: Category[] = [];
  form: Category = { id: 0, name: '', description: '', parent: 0 };
  editMode = false;
  deleteId: number | null = null;
  successMsg = '';
  errorMsg = '';
  modalOpen = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: () => (this.errorMsg = 'Failed to load categories'),
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.categoryService.updateCategory(this.form).subscribe({
        next: () => {
          this.successMsg = 'Category updated successfully';
          this.resetForm();
          this.fetchCategories();
        },
        error: () => (this.errorMsg = 'Update failed'),
      });
    } else {
      this.categoryService.addCategory(this.form).subscribe({
        next: () => {
          this.successMsg = 'Category added successfully';
          this.resetForm();
          this.fetchCategories();
        },
        error: () => (this.errorMsg = 'Add failed'),
      });
    }
  }

  getParentName(parentId: number): string {
    if (parentId === 0) return 'Main Category';
    const parent = this.categories.find(c => c.id === parentId);
    return parent ? parent.name : 'Main Category';
  }
  
  onEdit(category: Category): void {
    this.form = { ...category };
    this.editMode = true;
  }

  onDelete(): void {
    if (this.deleteId !== null) {
      this.categoryService.deleteCategory(this.deleteId).subscribe({
        next: () => {
          this.successMsg = 'Category deleted';
          this.fetchCategories();
        },
        error: () => (this.errorMsg = 'Delete failed'),
        complete: () => (this.modalOpen = false),
      });
    }
  }

  resetForm(): void {
    this.form = { id: 0, name: '', description: '', parent: 0 };
    this.editMode = false;
  }

  openDeleteModal(id: number): void {
    this.deleteId = id;
    this.modalOpen = true;
  }
}
