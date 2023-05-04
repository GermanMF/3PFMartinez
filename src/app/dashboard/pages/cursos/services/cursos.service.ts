import { Injectable } from '@angular/core';
import { Curso } from '../models';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos$ = new BehaviorSubject<Curso[]>([
    {
      id: 1,
      materia: 'Matemáticas',
      cupos: 16,
      grupos: 3,
      tutor: 'Galilea Montijo'
    },
    {
      id: 2,
      materia: 'Español',
      cupos: 20,
      grupos: 2,
      tutor: 'Changoleón Rodriguez'
    },
    {
      id: 3,
      materia: 'Civismo',
      cupos: 10,
      grupos: 1,
      tutor: 'Cuauhtemoc Blanco'
    },
    {
      id: 4,
      materia: 'Ciencias Naturales',
      cupos: 12,
      grupos: 1,
      tutor: 'Lilia Laureles'
    },
  ]);

  constructor() { }

  getCursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  getCursoById(id: number): Observable<Curso | undefined> {
    return this.cursos$
      .asObservable()
      .pipe(map((cursos) => cursos.find((alumno) => alumno.id === id)));
  }
}
