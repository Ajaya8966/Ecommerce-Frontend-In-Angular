import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] 
})
export class ContactComponent {
  contactForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    subject: new FormControl(""),
    message: new FormControl(""),
   // name: ['', [Validators.required]],
    // email: ['', [Validators.required, Validators.email]],
    // subject: ['', [Validators.required]],
    // message: ['', [Validators.required]],
  });

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.submitContactForm(this.contactForm.value).subscribe(
        (response) => {
          this.successMessage = 'Your message has been sent successfully!';
          this.contactForm.reset();
        },
        (error) => {
          this.errorMessage = 'There was an error sending your message. Please try again later.';
        }
      );
    }
  }
}
