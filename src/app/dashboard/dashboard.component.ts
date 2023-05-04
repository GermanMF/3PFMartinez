import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from './pages/alumnos/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../core/models';

export interface linkProperty {
  id: number;
  route: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy, OnInit {
  showFiller = false;
  durationInSeconds = 5;

  destroyed$ = new Subject<void>();
  authUser$: Observable<Usuario | null>;

  nombreAuthControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);

  linkProperties: linkProperty[] = [
    {
      id: 1,
      route: 'alumnos',
      name: 'Alumnos',
    },
    {
      id: 2,
      route: 'cursos',
      name: 'Cursos',
    },
    {
      id: 3,
      route: 'inscripciones',
      name: 'Inscripciones',
    },
  ];

  constructor(
    private authService: AuthService,
    // private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.authUser$ = this.authService.getAuthUser();
  }
  ngOnInit(): void {
    console.log('configured routes: ', this.router.config);
  }

  // openSnackBar(alumnoAutenticado: string) {
  //   this._snackBar.open(alumnoAutenticado, '', { duration: this.durationInSeconds * 1000});
  // }

  // onSubmit(): void {
  //   if (this.authForm.valid) {
  //     this.authService.enviarAdrawer(this.nombreAuthControl.value!);
  //     this.openSnackBar(
  //       `El alumno 👩‍🔬: ${this.nombreAuthControl.value!} se logueó`
  //     );
  //   } else {
  //     this.openSnackBar('Error al loguear alumno');
  //   }
  // }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout();
  }

  // role(): void {
  //   console.log(this.authService.verifyRole());
  //   this.authService.verifyRole();
  // }

  getRoute(): string {
    return this.router.url;
  }
}
