export class Alumno {
    constructor(
      public id: number = 0,
      public firstName: string = "",
      public lastName: string = "",
      public update: Date,
      public materias: string[],
      public online: boolean = false,
    ) {}
  }
  