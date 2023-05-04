import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models';
import { Subject, takeUntil } from 'rxjs';

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
    this.alumnosService.getAlumnoById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((alumno) => this.alumno = alumno);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
