export class Usuario {
    constructor(
      public id: number,
      public nombre: string,
      public apellido: string,
      public password: string,
      public email: string,
      public role: string,
      public token: string,
    ) {}
  }
  