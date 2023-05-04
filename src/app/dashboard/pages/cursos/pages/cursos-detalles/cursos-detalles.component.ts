import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cursos-detalles',
  templateUrl: './cursos-detalles.component.html',
  styleUrls: ['./cursos-detalles.component.scss']
})
export class CursosDetallesComponent {
  curso: Curso | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService
  ) {
    this.cursosService.getCursoById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((curso) => this.curso = curso);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
