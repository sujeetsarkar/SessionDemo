import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  sessionRes: string = '';
  constructor(private authenticationService: AuthenticationService) { }
  getSessionRes() {
    this.authenticationService.getUserData().subscribe((data: any) => {
      this.sessionRes = data;
    },
      (error: any) => {
        console.log(error);
      });
  }
}
