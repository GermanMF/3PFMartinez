import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models';
import { Subject, takeUntil, tap, Observable } from 'rxjs';

@Component({
  selector: 'app-alumnos-detalles',
  templateUrl: './alumnos-detalles.component.html',
  styleUrls: ['./alumnos-detalles.component.scss'],
})
export class AlumnosDetallesComponent implements OnDestroy {
  alumno: Alumno | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService
  ) {
    this.alumnosService
      .getAlumnoById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((alumnos) => {
        this.alumno = alumnos;
      });
  }

  deleteMateria(alumno: Alumno, materia: number): void {
    const index =
    alumno.materias.findIndex((materiaI) => {
      return materiaI.id === materia
    });
    alumno.materias.splice(index, 1);
    this.alumnosService.updateAlumnos(alumno, alumno.id).subscribe((uMateria) => alumno.id = uMateria.id);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
