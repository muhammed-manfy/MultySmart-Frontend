import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let timer = new Date();
    if (localStorage.getItem("user-token") == null) {
      this.router.navigate(['/login']);
      this.snackBar.open("You Must Be logged in", "Ok", {
        duration: 3 * 1000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
      return false;
    }
    return true;
  }
}
