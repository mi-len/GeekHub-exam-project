import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dropdownLi : string = "nav-item dropdown";
  dropdownMenu : string = "dropdown-menu";
  
  loggedUser : string
  adminStatus : boolean
  constructor(private authService : AuthService, private router : Router) { 
  }

  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.loggedUser = localStorage.getItem('username')
    }
  }

  logout() {
    this.authService.logout()
      .subscribe(data => {
        localStorage.clear();
        this.authService.authtoken = '';
        this.router.navigate(['/landing'])
      })
  }

  expand() {
    this.dropdownLi.endsWith('show') 
    ? this.dropdownLi = "nav-item dropdown" 
    : this.dropdownLi = "nav-item dropdown show";

    this.dropdownMenu.endsWith('show')
    ? this.dropdownMenu = "dropdown-menu"
    : this.dropdownMenu = "dropdown-menu show";
  }

}
