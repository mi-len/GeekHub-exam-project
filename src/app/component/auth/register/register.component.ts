import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { RegisterModel } from '../../../models/register.model';
import { AuthService } from '../../../services/auth.service';
import { style, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent implements OnInit {
  model : RegisterModel;

  constructor(
    private authService : AuthService, 
    private router : Router) {
    this.model = new RegisterModel('', '', '', '', '', 18)
   }

  ngOnInit() {
  }

  register() {
    // delete this.model['confirmPassword']
    let modelExcPass = Object.assign({}, this.model)
    delete modelExcPass['confirmPassword']

    this.authService.register(modelExcPass)
      .subscribe(
        data => {
          this.router.navigate(['/login'])
      })
  }
}