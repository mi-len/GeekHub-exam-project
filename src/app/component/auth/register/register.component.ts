import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { RegisterModel } from '../../../models/register.model';
import { AuthService } from '../../../services/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : RegisterModel;
  // loginFailed : boolean;
  // errMessage : string;

  constructor(
    private authService : AuthService, 
    private router : Router) {
    this.model = new RegisterModel('', '', '', '', '', 18)
   }

  ngOnInit() {
  }

  register() {
    // delete this.model['confirmPassword']

    this.authService.register(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/login'])
        console.log(data)//-------------------------------------reg
        // this.toastr.success('Register successful!', 'Success!')//--mahni i gore
      }, 
      err => {
        // this.loginFailed = true;
        // this.errMessage = err['error']['description']
      })
  }
}