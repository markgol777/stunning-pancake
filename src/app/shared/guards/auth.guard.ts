import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'USER')){
      return true;
    } 
    this.router.navigate(['']);
      return false;
  }
  
}
