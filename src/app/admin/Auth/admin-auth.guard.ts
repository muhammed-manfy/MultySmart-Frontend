import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate ,CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem("admin-token") == null) {
        this.router.navigate(['/admin/login']);
        return false;
      }
      return true;
    }
    
}
