import { Alumno } from "../../alumnos/models";
import { Curso } from "../../cursos/models";

export class Inscripcion {
  constructor(
      public id: number,
      public materia: Curso,
      public materia_id: number,
      public alumno: Alumno,
      public alumno_id: number
  ){}
}
