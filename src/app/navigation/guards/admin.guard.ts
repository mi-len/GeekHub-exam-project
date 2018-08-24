import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService  : AuthService, 
    private router : Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    return this.check();
  }

  check() {
    if (this.authService.isAdmin()) {
      console.log('true na isAdm');
      
      return true;
    }

    this.router.navigate(['./landing']);
    return false
  }
}

