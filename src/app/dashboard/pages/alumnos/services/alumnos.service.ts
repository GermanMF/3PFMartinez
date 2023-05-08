import { Injectable } from '@angular/core';
import { Alumno } from '../models';
import { BehaviorSubject, Observable, map, tap, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environment/environment';

const milisecondsHour = 3600000;

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  randomHours = function getRandomInt(top: number) {
    return Math.floor(Math.random() * top);
  };

  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.httpClient
      .get<Alumno[]>(`${environment.apiBaseUrl}/alumnos`)
      .pipe(map((response) => response));
    // return this.alumnos$.asObservable();
  }

  getAlumnoById(id: number): Observable<Alumno | undefined> {
    return this.httpClient
      .get<Alumno>(`${environment.apiBaseUrl}/alumnos/${id}`)
      .pipe(map((response) => response));
  }

  addAlumnos(alumno: Alumno): Observable<Alumno> {
    return this.httpClient.post<Alumno>(
      `${environment.apiBaseUrl}/alumnos`,
      alumno
    );
  }

  updateAlumnos(alumno: Alumno, id:number): Observable<Alumno> {
    return this.httpClient.put<Alumno>(`${environment.apiBaseUrl}/alumnos/${id}`,alumno)
  }

  deleteAlumnos(id: number): Observable<Alumno> {
    return this.httpClient.delete<Alumno>(`${environment.apiBaseUrl}/alumnos/${id}`)
  }
}
