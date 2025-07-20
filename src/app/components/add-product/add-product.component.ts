import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../services/master.service';
import { AlertService } from '../../../services/alert.service';
import { TitleService } from '../../../services/title.service';
import { RepoService } from '../../../services/repo.service';
import { SnackService } from '../../../services/snack.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  public mode: string = 'new';
  productForm!: FormGroup;
  getBizHousesMasterList: any;
  getProductCategoriesMasterList: any;
  getProductSubCategoriesListMasterList: any;
  getBizHousesLocationList: any;
  getCurrencyTypeList: any;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private alertService: AlertService,
    private repoService: RepoService,
    private titleService: TitleService,
    private snackService: SnackService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      bizHouseID: [''],
      productCategoryID: [''],
      productSubCategoryID: [''],
      productDetailsName: ['', [Validators.required, Validators.minLength(3)]],
      productHighlight: ['', [Validators.required, Validators.maxLength(255)]],

      locationInfo: this.fb.array([]),
      priceInfo: this.fb.array([]),
      dimensionsInfo: this.fb.array([]),
    });

    this.addLocation();
    this.addPrice();
    this.addDimension();

    // biz-bazzar
    this.masterService.getMaster('getBizHouses').subscribe({
      next: (response: any) => {
        if (response && response.result) {
          this.getBizHousesMasterList = response.result;
        } else {
          this.getBizHousesMasterList = [];
        }
      },
    });

    // Product Categories
    this.masterService.getMaster('getProductCategoriesList').subscribe({
      next: (response: any) => {
        if (response && response.result) {
          this.getProductCategoriesMasterList = response.result;
        } else {
          this.getProductCategoriesMasterList = [];
        }
      },
    });

    // currecy
    this.masterService.getCurrencyAll().subscribe({
      next: (response: any) => {
        if (response && response.result) {
          this.getCurrencyTypeList = response.result;
        } else {
          this.getCurrencyTypeList = [];
        }
      },
    });

    this.titleService.setTitle(
      Add-Product | ${this.repoService.getUserName()}
    );
  }

  // location
  onBizHouse(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const selectedBizhouse = this.getBizHousesMasterList.find(
      (cat: any) => cat.BizHouseGID === selectedValue
    );
    const api = getLocationBizHouseID/${selectedBizhouse.BizHouseGID};
    this.masterService.getMaster(api).subscribe({
      next: (response: any) => {
        if (response && response.result) {
          this.getBizHousesLocationList = response.result;
        } else {
          this.getBizHousesLocationList = [];
        }
      },
    });
  }
  onCategory(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const selectedCategory = this.getProductCategoriesMasterList.find(
      (cat: any) => cat.ProductCategoryGID === selectedValue
    );
    const api = getProductCategoryIDWeb/${selectedCategory.ProductCategoryGID};
    this.masterService.getMaster(api).subscribe({
      next: (response: any) => {
        if (response && response.result) {
          this.getProductSubCategoriesListMasterList = response.result;
        } else {
          this.getProductSubCategoriesListMasterList = [];
        }
      },
    });
  }

  get locationInfo(): FormArray {
    return this.productForm.get('locationInfo') as FormArray;
  }
  get priceInfo(): FormArray {
    return this.productForm.get('priceInfo') as FormArray;
  }
  get dimensionsInfo(): FormArray {
    return this.productForm.get('dimensionsInfo') as FormArray;
  }

  addLocation() {
    this.locationInfo.push(
      this.fb.group({
        locationID: [''],
      })
    );
  }

  addPrice() {
    this.priceInfo.push(
      this.fb.group({
        currencyCode: ['', [Validators.required]],
        productPrice: [0, [Validators.required, Validators.min(1)]],
        productDiscountPrice: [0, [Validators.min(0)]],
        productMemberPrice: [0, [Validators.min(0)]],
        productDiscountDate: [''],
        isVoucherApplicable: [0, [Validators.required]],
        voucherCode: [''],
        voucherPrice: [0, [Validators.min(0)]],
        voucherApplicableDate: [''],
        productAvailableQuantity: [0, [Validators.required, Validators.min(0)]],
        productBookedQuantity: [0, [Validators.min(0)]],
        productSoldQuantity: [0, [Validators.min(0)]],
      })
    );
  }

  addDimension() {
    this.dimensionsInfo.push(
      this.fb.group({
        productDetailsDimensionsName: [
          '',
          [Validators.required, Validators.minLength(1)],
        ],
        productDetailsDimensionsDescription: ['', [Validators.maxLength(1000)]],
      })
    );
  }

  submitForm() {
    if (this.productForm.invalid) {
      this.showValidationErrors(this.productForm);
      this.snackService.showMessage('Please fill all required fields.');
      return;
    }
    const payload = { mode: this.mode, data: this.productForm.value };
    const api = 'saveProductDetails';
    this.masterService.saveMaster(api, payload).subscribe({
      next: (response: any) => {
        this.productForm.reset();
        this.alertService.showAlert(response.result, 'success');
      },
      error: (error: any) => {
        this.alertService.showAlert('Error Occur During ?? ', 'error');
      },
    });
  }

  private showValidationErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.showValidationErrors(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((ctrl) =>
          this.showValidationErrors(ctrl as FormGroup)
        );
      } else {
        control?.markAsTouched();
        control?.updateValueAndValidity();
      }
    });
  }
}