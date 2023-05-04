export class Curso {
    constructor(
        public id: number = 0,
        public materia: string = "",
        public cupos: number = 0,
        public grupos: number = 0,
        public tutor: string = "",
    ) {}
}