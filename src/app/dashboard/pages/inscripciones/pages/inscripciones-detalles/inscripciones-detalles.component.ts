import { Component } from '@angular/core';
import { Inscripcion } from '../../models';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripciones-detalles',
  templateUrl: './inscripciones-detalles.component.html',
  styleUrls: ['./inscripciones-detalles.component.scss']
})
export class InscripcionesDetallesComponent {

  inscripcion: Inscripcion | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService
  ) {
    this.inscripcionesService.getInscripcionesById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscripcion) => this.inscripcion = inscripcion);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
