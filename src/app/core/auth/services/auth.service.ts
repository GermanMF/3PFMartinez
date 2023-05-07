import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment.prod';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser$ = new BehaviorSubject<Usuario | any>(null);

  constructor(private router: Router, private httpClient: HttpClient) {
    console.log(
      this.httpClient
        .get<Usuario[]>(`${environment.apiBaseUrl}/usuarios`)
        .subscribe({
          next: (users) => {
            localStorage.setItem('role', users[0].role);
          },
        })
    );
  }

  getAuthUser(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  login(formValue: LoginFormValue): void {
    this.httpClient
      .get<Usuario[]>(`${environment.apiBaseUrl}/usuarios`, {
        params: {
          ...formValue,
        },
      })
      .subscribe({
        next: (users) => {
          const loggedUser = users[0];
          if (loggedUser) {
            localStorage.setItem('token', loggedUser.token);
            this.authUser$.next(loggedUser);
            this.router.navigate(['dashboard']);
          } else {
            alert('Usuario y/o contraseña incorrecta');
          }
        },
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient
      .get<Usuario[]>(`${environment.apiBaseUrl}/usuarios?token=${token}`, {
        headers: new HttpHeaders({
          Authorization: token || '',
        }),
      })
      .pipe(
        map((users) => {
          const loggedUser = users[0];
          if (loggedUser) {
            localStorage.setItem('token', loggedUser.token);
            this.authUser$.next(loggedUser);
          }
          return !!loggedUser;
        }),
        catchError((err) => {
          alert('Error al verificar el token');
          return throwError(() => err);
        })
      );
  }
}
