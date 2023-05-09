
import { Curso } from "../../cursos/models";

export class Alumno {
    constructor(
      public id: number = 0,
      public firstName: string = "",
      public lastName: string = "",
      public update: Date,
      public materias: Curso[],
      public online: boolean = false,
    ) {}
  }
  