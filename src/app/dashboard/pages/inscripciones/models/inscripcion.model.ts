export class Inscripcion {
  constructor(
    public id: number = 0,
    public estudiantes: String[] = [],
    public materia: string = '',
    public grupo: string = '',
    public startDate: Date = new Date()
  ) {}
}
