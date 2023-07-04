import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: string | undefined | null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = localStorage.getItem('user');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
