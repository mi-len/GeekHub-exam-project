import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../../models/login.model'
import { AuthService } from '../../../services/auth.service';
import { style, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('form', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0.1 }),
        animate('0.5s ease-out', 
          style({ transform: 'translateY(0)', opacity: 1 }))
      ]),      
    ])
  ]
})
export class LoginComponent implements OnInit {
  model : LoginModel;

  constructor(
    private authService : AuthService,
    private router : Router) { 

    this.model = new LoginModel('', '')
  }
  
  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data)
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
