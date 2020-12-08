import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from '@core/services/notification.service';

import { User } from '@core/interfaces/user.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService
  ) { }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  register(user: User): void {
    this.http.post<User>(`${baseUrl}/user/register`, user, this.httpOptions).subscribe(
      data => {
        this.ns.show('Sikeres regisztráció!');
      },
      error => {
        this.ns.show('HIBA! Regisztráció sikertelen!');
        console.error(error);
      }
    );
  }

  login(user: User): void {
    this.http.post<User>(`${baseUrl}/user/login`, user, this.httpOptions).subscribe(
      data => {
        localStorage.setItem('token', data['token']);
        this.isLogin$.next(true);
        this.ns.show('Sikeres bejelentkezés!');
        this.router.navigate(['/issues/active']);
      },
      error => {
        this.ns.show('HIBA! Bejelentkezés sikertelen!');
        console.error(error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin$.next(false);
    this.ns.show('Sikeres kijelentkezés!');
    this.router.navigate(['/']);
  }

  protected hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}