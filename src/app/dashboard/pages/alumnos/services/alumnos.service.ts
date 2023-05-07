import { Injectable } from '@angular/core';
import { Alumno } from '../models';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

const milisecondsHour = 3600000;

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  randomHours = function getRandomInt(top: number) {
    return Math.floor(Math.random() * top);
  };

  private alumnos$ = new BehaviorSubject<Alumno | any>(null);

  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.httpClient
      .get<Alumno[]>(`${environment.apiBaseUrl}/alumnos`)
      .pipe(
        map((response) => response));
    // return this.alumnos$.asObservable();
  }

  getAlumnoById(id: number): Observable<Alumno[] | undefined> {
    return this.httpClient
    .get<Alumno[]>(`${environment.apiBaseUrl}/alumnos/${id}`)
    .pipe(
      // tap(response => console.log(response)),
      map(response => response));
    // return this.alumnos$
    //   .asObservable()
    //   .pipe(
    //     map((alumnos) =>
    //       alumnos.find((alumno: { id: number }) => alumno.id === id)
    //     )
    //   );
  }

  // getTotal(id: number): Observable<Alumno | number> {
  //   return this.getAlumnoById(id).pipe(
  //     map(
  //       (alumnos) =>
  //         (alumnos?.espanol! +
  //           alumnos?.matematicas! +
  //           alumnos?.cienciasNaturales! +
  //           alumnos?.civismo!) /
  //         4
  //     )
  //   );
  // }
}
