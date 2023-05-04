import { Injectable } from '@angular/core';
import { Alumno } from '../models';
import { BehaviorSubject, Observable, map } from 'rxjs';

const milisecondsHour = 3600000;

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  randomHours = function getRandomInt(top: number) {
    return Math.floor(Math.random() * top);
  };

  private alumnos$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Perez',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 5,
      espanol: 5,
      cienciasNaturales: 5,
      civismo: 8,
      online: false,
    },
    {
      id: 2,
      firstName: 'Benito',
      lastName: 'Palurdo',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 6,
      espanol: 7,
      cienciasNaturales: 9,
      civismo: 5,
      online: true,
    },
    {
      id: 3,
      firstName: 'Constantino',
      lastName: 'Gomez',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 10,
      espanol: 10,
      cienciasNaturales: 9,
      civismo: 10,
      online: false,
    },
    {
      id: 4,
      firstName: 'Querubinosa',
      lastName: 'Rodriguez',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 5,
      espanol: 5,
      cienciasNaturales: 6,
      civismo: 5,
      online: false,
    },
    {
      id: 5,
      firstName: 'Alibaba',
      lastName: 'Zamudio',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 9,
      espanol: 10,
      cienciasNaturales: 5,
      civismo: 8,
      online: true,
    },
    {
      id: 6,
      firstName: 'Golondrino',
      lastName: 'Amaterasu',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 7,
      espanol: 9,
      cienciasNaturales: 5,
      civismo: 6,
      online: false,
    },
    {
      id: 7,
      firstName: 'Valentin',
      lastName: 'Elizalde',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 10,
      espanol: 10,
      cienciasNaturales: 10,
      civismo: 10,
      online: false,
    },
    {
      id: 8,
      firstName: 'Cuauhtemoc',
      lastName: 'Valdivia',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 6,
      espanol: 6,
      cienciasNaturales: 5,
      civismo: 5,
      online: false,
    },
    {
      id: 9,
      firstName: 'Tom',
      lastName: 'Hanks',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 10,
      espanol: 5,
      cienciasNaturales: 9,
      civismo: 10,
      online: true,
    },
    {
      id: 10,
      firstName: 'Jonathan',
      lastName: 'Sardino',
      update: new Date(Date.now() - this.randomHours(1000) * milisecondsHour),
      matematicas: 6,
      espanol: 10,
      cienciasNaturales: 6,
      civismo: 8,
      online: false,
    },
  ]);

  constructor() { }


  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }

  getAlumnoById(id: number): Observable<Alumno | undefined> {
    return this.alumnos$
      .asObservable()
      .pipe(map((alumnos) => alumnos.find((alumno) => alumno.id === id)));
  }

  getTotal(id: number): Observable<Alumno | number> {
    return this.getAlumnoById(id).pipe(
      map(
        (alumnos) =>
          (alumnos?.espanol! +
            alumnos?.matematicas! +
            alumnos?.cienciasNaturales! +
            alumnos?.civismo!) /
          4
      )
    );
  }

}
