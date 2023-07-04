import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:5273/api/Session';

  constructor(private http: HttpClient) { }

  login(credential: Login) {
    return this.http.post(`${this.baseUrl}/authenticate`, credential, { withCredentials: true });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user')?true: false;
  }

  logout() {
    localStorage.removeItem('user');
  }

  getUserData() {
    const header = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(`${this.baseUrl}/fetch-from-session`, { withCredentials: true, responseType: 'text'});
  }

}
