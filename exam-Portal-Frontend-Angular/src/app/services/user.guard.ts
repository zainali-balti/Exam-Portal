import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.getUserRole() === 'user' && this.loginService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false; 
  }
}
