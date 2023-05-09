import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models';
import { Subject, takeUntil } from 'rxjs';
import { Alumno } from '../../../alumnos/models/alumno.model';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';

@Component({
  selector: 'app-cursos-detalles',
  templateUrl: './cursos-detalles.component.html',
  styleUrls: ['./cursos-detalles.component.scss'],
})
export class CursosDetallesComponent {
  curso: Curso | undefined;
  alumnos: Alumno[] | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private alumnosService: AlumnosService
  ) {
    this.cursosService
      .getCursoById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((curso) => (this.curso = curso));
    this.alumnosService.getAlumnos().subscribe((alumnosAll) => {
      this.alumnos = alumnosAll;
    });
  }

  alumnosInscritos(materia: string): Alumno[] {
    // this.alumnos?.filter(alumno => alumno.materias[0].materia === materia)
    // this.alumnos?.filter(alumno => alumno.materias.forEach(materia => materia))
    // console.log(this.alumnos)
    // console.log(materia)
    // console.log(this.alumnos?.forEach(alumno => alumno.materias))
    // console.log(this.alumnos?.forEach(alumno => alumno.materias.filter(materiaS => materiaS.materia === materia)))
    // let totalAlumnos = Alumno[]
    let totalAlumnos: Alumno[] = []
    this.alumnos?.forEach((alumnoF) => {
      alumnoF.materias.forEach((alumnoE) => {
        if (alumnoE.materia === materia) {
          totalAlumnos.push(alumnoF)
        }
      });
    });
    // console.log(totalAlumnos)
    return totalAlumnos;

    // this.alumnos?.forEach(alumno => {
    //  alumno.materias.filter(materiAl => {
    //   materiAl.materia===materia
    //  })
    // });
    // this.alumnos.forEach(element => {

    // });
  }

  deleteAlumno(alumno: Alumno, materia: number){
    const index =
    alumno.materias.findIndex((materiaI) => {
      return materiaI.id === materia
    });
    alumno.materias.splice(index, 1);
    this.alumnosService.updateAlumnos(alumno, alumno.id).subscribe((uMateria) => alumno.id = uMateria.id);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
