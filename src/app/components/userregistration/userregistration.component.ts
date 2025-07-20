import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,  FormsModule,  ReactiveFormsModule,  ValidationErrors,  Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserRegistrationService } from './userregistration.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-userregistration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FormsModule],
  templateUrl:'./userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent implements OnInit {
 registrationForm!:FormGroup;
 modalRef?: BsModalRef;
  userLists: any[] = [];
  entriesToShow = 10;
  searchText = '';
  currentUserId: string | null = null;
  page: number = 1;

  isFormVisible: boolean = false;


  perPages = [10, 20, 50, 100];
  pagination = {
    total: 0,
    currentPage: 0,
    perPage: 10
  };
  searchTerm: string = '';
  column: string = '';
  isDesc: boolean = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private service: UserRegistrationService,
    private modalService: BsModalService
   // private modalService: BsModalService
  ) {
    this.registrationForm = this.fb.group({
      id: [''],
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      cpassword: ['', [Validators.required]],
      usertype: ['',[Validators.required]],
      mobile: ['',[Validators.required]],
      fullname: ['',[Validators.required]],
      email: ['',[Validators.required]],
      agencyid: [''],
      userstatus: [1],
    },
    { validators: this.passwordMatchValidator as any, }
  );
  }

  passwordMatchValidator(formGroup: AbstractControl):ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('cpassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  ngOnInit(): void {
    this.getList();
    this.getUserType();
    this.getAgency();
  }

  openModal(template: TemplateRef<any>){
        this.resetForm();
      this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-xl' },{ style: 'max-width: 90%;' } ));   
          }
  //  openModal(template: TemplateRef<any>){
  //       this.resetForm();
  //     this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-xl' },{ style: 'max-width: 90%;' } ));   
  //         }

          
  agencies:any;
  usertypes:any;
  getUserType(){
    this.service.getUserType().subscribe({
      next: (dt) => {
       this.usertypes=dt.data;
      },
      error: (err) => {
        this.toastr.success(err.error.message, 'Error');
      }
    });
  }
pelabel="Public Enterprise";
  getAgencyType(id:any){
    if(id=="39312988171343287"){
      this.getAgency();
    }else if(id=="251109707768379486"){
      this.getLineMinistry();
      this.pelabel="Line Ministry";
    }else{
      this.agencies=undefined;
    }
  }

  getLineMinistry(){
    this.service.getLineMinistry().subscribe({
      next: (dt) => {
       this.agencies=dt.data;
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }

  getAgency(){
    this.service.getAgency().subscribe({
      next: (dt) => {
       this.agencies=dt.data;
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }

  paginatedData($event: { page: number | undefined }) {
    this.getList($event.page);
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  getList(pageno?: number | undefined): void {
    const page = pageno || 1;
    this.pagination.perPage = this.entriesToShow;
    this.service.getList(this.pagination.perPage, page, this.searchText, this.column, this.isDesc).subscribe({
      next: (result: any) => {
        this.userLists = result.data;
        this.pagination.total = result.total;
        this.pagination.currentPage = result.currentPage;
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formValue = { ...this.registrationForm.value };

      if (formValue.id) {
        // Update existing level
        this.service.update(formValue.id, formValue).subscribe({
          next: () => {
            this.toastr.success('Item Successfully Updated!', 'Success');
            this.getList();
            this.resetForm();
            this.isFormVisible = false;
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Error');
          }
        });
      } else {
        // Add new level
        this.service.create(formValue).subscribe({
          next: () => {
            this.getList();
            this.toastr.success('Item Successfully Created!', 'Success');
            this.resetForm();
            this.isFormVisible = false;
          },
          error: (err) => {
            this.toastr.error('Error adding employee level: ' + err);
          }
        });
      }
    }
  }

  bgClasses = ['bg-orange', 'bg-primary', 'bg-teal', 'bg-purple', 'bg-blue', 'bg-success', 'bg-green', 'bg-red'];
   getInitial(fullname: string): string {
    if (!fullname) return '';

    const words = fullname.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    } else {
        return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    }
}

  editUser(uf: any): void {
    this.service.getEdit(uf).subscribe({
      next: (dt) => {
        this.registrationForm.patchValue(dt);
        // this.isFormVisible = true;
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    });
    this.currentUserId = uf.id;
  }
  getStartRecord(): number {
    return (this.pagination.currentPage - 1) * this.pagination.perPage + 1;
  }

  getEndRecord(): number {
    const endRecord = this.pagination.currentPage * this.pagination.perPage;
    return endRecord > this.pagination.total ? this.pagination.total : endRecord;
  }
  

  deleteUser(id: string): void {
    if (window.confirm('Are sure you want to delete this item?')) {
      this.service.remove(id).subscribe({
        next: () => {
          this.toastr.success('Item Successfully Deleted!', 'Success');
          this.getList();
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
        }
      });
    }
  }

  resetForm(): void {
    this.registrationForm = this.fb.group({
      id: [''],
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      cpassword: ['', [Validators.required]],
      usertype: ['',[Validators.required]],
      mobile: ['',[Validators.required]],
      fullname: ['',[Validators.required]],
      email: ['',[Validators.required]],
      agencyid: [''],
      userstatus: [1],
    },
    { validators: this.passwordMatchValidator as any, }
  );
    this.currentUserId = null;
  }
    isExpanded: boolean = false;
  expandContent(){
    this.isExpanded = !this.isExpanded;
  }
  
  onPageChange(page: number) {
    this.page = page;
    this.getList();
  }
}
