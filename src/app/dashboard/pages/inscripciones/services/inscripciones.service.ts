import { Injectable } from '@angular/core';
import { Inscripcion } from '../models';
import { BehaviorSubject, Observable, map } from 'rxjs';

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

  private inscripciones$ = new BehaviorSubject<Inscripcion[]>([
    {
      id: 1,
      estudiantes: ["Jaime Mausan", "Chorofilo Ramirez", "Talon de Aquiles", "Quelite Chiron", "Taraumara Perez", "Cuahtemoc Azul", "Toribio Malón", "Soyla Bacan", "Mercedes Bens", "Heberto Ledezma"],
      materia: 'Civismo',
      grupo: 'A',
      startDate: new Date(Date.now() + this.randomHours(1000) * milisecondsHour)
    },
    {
      id: 2,
      estudiantes: ["Messi Ramón", "Telerín Fernández", "Telaviv Rasputia", "Jeronimo Valdez", "Rafita Valderrama", "Cesar Pérez", "Polonio Radón", "Sofía Pérez", "Selenio Hidrógenez", "Sanpakuto Zanahorio", "Querubina Joseph"],
      materia: 'Español',
      grupo: 'C',
      startDate: new Date(Date.now() + this.randomHours(1000) * milisecondsHour)
    },
    {
      id: 3,
      estudiantes: ["Heberto Ledezma", "Telerín Fernández", "Soyla Bacan", "Jeronimo Valdez", "Cerre Siete", "Chorofilo Ramirez", "Polonio Radón", "Mercedes Bens", "Selenio Hidrógenez", "Sanpakuto Zanahorio", "Querubina Joseph"],
      materia: 'Matemáticas',
      grupo: 'B',
      startDate: new Date(Date.now() + this.randomHours(1000) * milisecondsHour)
    },
    {
      id: 4,
      estudiantes: ["Elba Nanero", "Telerín Fernández", "Soyla Bacan", "Salomon Bibliez", "Pogba Germain", "Chorofilo Ramirez", "Neil Armstrong", "Mercedes Bens", "Sardino Enriquez", "Naruto Haruno", "Querubina Joseph"],
      materia: 'Ciencias Naturales',
      grupo: 'C',
      startDate: new Date(Date.now() + this.randomHours(1000) * milisecondsHour)
    }
  ]);

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
