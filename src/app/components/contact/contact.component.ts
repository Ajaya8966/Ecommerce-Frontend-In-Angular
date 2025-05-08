// contact.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMessage, ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup; // reactive form object
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData: ContactMessage = this.contactForm.value;  //get form data
      this.contactService.sendMessage(contactData).subscribe({
        next: (res) => {
          this.successMessage = res;
          this.errorMessage = null;
          this.contactForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.successMessage = null;
        }
      });
    }
  }
}
