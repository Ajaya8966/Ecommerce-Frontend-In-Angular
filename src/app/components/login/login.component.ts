import { Component, inject } from '@angular/core';
import { IntegrationService } from '../../services/integration.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private integration: IntegrationService){ }


  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  router = inject(Router)
  request: LoginRequest = new LoginRequest;


  doLogin(){
    const formValue = this.userForm.value;

    if(formValue.username == '' || formValue.password == ''){
      alert('Worng Crendential')
      return
    }

    this.request.username = formValue.username
    this.request.password = formValue.password

    this.integration.doLogin(this.request).subscribe({
      next:(res) => {
        console.log("Received Response:"+res.token)
        this.router.navigateByUrl('dashboard')
      }, error: (err) => {
        console.log("Error Reveived Response:" +err)
      }
    })

  }

}
