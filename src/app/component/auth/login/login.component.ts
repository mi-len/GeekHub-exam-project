import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../../models/login.model'
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : LoginModel;
  loginFailed : boolean;
  errMessage : string;

  constructor(
    private authService : AuthService,
    private router : Router,
    private toastr : ToastrService) { 

    this.model = new LoginModel('', '')
  }
  
  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data)
          // console.log(data)//----------------------
        }, 
        err => {
          console.log(err);//-------------------------
          // this.loginFailed = true;
          // this.errMessage = err['error']['description']
        }
      )
  }

  isAdmin(data) {
    if (data['isAdmin']) {
      localStorage.setItem('adm', '1')
    } else {
      localStorage.setItem('adm', '0')
    }
  }

  successfulLogin(data) {
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('user_id', data['_id']);
    this.isAdmin(data)
    this.router.navigate(['/home']);   }
  

}
