import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from '@core/services/notification.service';

import { User } from '@core/interfaces/user.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private ns : NotificationService
  ) { }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  login(user: User): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
      }),
    }
    this.http.post<User>(`${baseUrl}/user/login`, user, httpOptions).subscribe(
      data => {
        console.log(data); // TODO: Use TOKEN from the data POST response.
        localStorage.setItem('token', 'A223wedw34w');
        this.isLogin$.next(true);
        this.ns.show('Sikeres bejelentkezés!');
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
  }

  protected hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
