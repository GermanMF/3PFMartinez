import { Injectable } from '@angular/core';
import { Inscripcion } from '../models';
import { BehaviorSubject, Observable, map, Subject } from 'rxjs';

// Mi modelo no se adecua para poder hacer el modelo relacional :(

// import { Alumno } from '../../alumnos/models';
// import { AlumnosService } from '../../alumnos/services/alumnos.service';

const milisecondsHour = 3600000;

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  randomHours = function getRandomInt(top: number) {
    return Math.floor(Math.random() * top);
  };

  private inscripciones$ = new Subject<Inscripcion[]>();

  constructor() { }

  getInscripciones(): Observable<Inscripcion[]> {
    return this.inscripciones$.asObservable();
  }

  getInscripcionesById(id: number): Observable<Inscripcion | undefined> {
    return this.inscripciones$
      .asObservable()
      .pipe(map((inscripciones) => inscripciones.find((inscripcion) => inscripcion.id === id)));
  }

}
