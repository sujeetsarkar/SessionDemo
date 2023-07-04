import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  userCredentials?: Login;
  returnUrl?: string;
  submitted = false;
  loading = false;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = new FormGroup({});
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.userCredentials = {
      username: '',
      password: ''
    };
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm?.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
      return;
    }
    if (this.userCredentials) {
      this.userCredentials.username = this.f?.['username'].value;
      this.userCredentials.password = this.f?.['password'].value;
      this.loading = true;
      this.authenticationService
        .login(this.userCredentials)
        .subscribe(
          (data: any) => {
            console.log(data);
            localStorage.setItem('user', data.username);
            this.router.navigate([this.returnUrl]);
          },
          (error: any) => {
            this.error = error;
          },
          () => {
            this.loading = false;
          }
        );
    }
  }
}
