import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  canLoad(route: Route): boolean {
    const isLogin = this.authenticationService.isLoggedIn();
    if (isLogin) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: route.path } });
    return false;
  }

}
