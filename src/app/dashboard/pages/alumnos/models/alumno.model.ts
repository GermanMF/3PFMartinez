export class Alumno {
    constructor(
      public id: number = 0,
      public firstName: string = "",
      public lastName: string = "",
      public update: Date,
      public matematicas: number = 0,
      public espanol: number = 0,
      public cienciasNaturales: number = 0,
      public civismo: number = 0,
      public online: boolean = false,
    ) {}
  }
  