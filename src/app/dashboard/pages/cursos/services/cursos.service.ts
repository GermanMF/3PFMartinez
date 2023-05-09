import { Injectable } from '@angular/core';
import { Curso } from '../models';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.httpClient
    .get<Curso[]>(`${environment.apiBaseUrl}/cursos`)
    .pipe(map((response) => response));
  }

  getCursoById(id: number): Observable<Curso | undefined> {
    return this.httpClient
    .get<Curso>(`${environment.apiBaseUrl}/cursos/${id}`)
    .pipe(map((response) => response));
  }

  addCurso(curso: Curso): Observable<Curso> {
    return this.httpClient.post<Curso>(
      `${environment.apiBaseUrl}/cursos`,
      curso
    );
  }
  updateCurso(curso: Curso, id:number): Observable<Curso> {
    return this.httpClient.put<Curso>(`${environment.apiBaseUrl}/cursos/${id}`,curso)
  }

  deleteCurso(id: number): Observable<Curso> {
    return this.httpClient.delete<Curso>(`${environment.apiBaseUrl}/cursos/${id}`)
  }
}
