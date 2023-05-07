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
export class AlumnosDetallesComponent implements OnDestroy, OnInit {
  alumno :  Alumno[] | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService
  ) {

      console.log(this.alumno)
  }
  ngOnInit(): void {
    this.alumnosService
    .getAlumnoById(parseInt(this.activatedRoute.snapshot.params['id']))
    .pipe(
    //   tap(alumno => console.log(alumno=this.alumno)))
     takeUntil(this.destroyed$))
    .subscribe((alumnos) => {
      this.alumno = alumnos;
      // console.log("Perro")
      console.log(this.alumno);
    });
    // console.log('Waa' + this.alumnosService.getAlumnoById(6).subscribe(alumnos => {this.alumno = alumnos}));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
