import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion } from '../../models';
import { Observable, Subject } from 'rxjs';
import { Alumno } from '../../../alumnos/models';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Curso } from '../../../cursos/models';
import { CursosService } from '../../../cursos/services/cursos.service';

@Component({
  selector: 'app-inscripciones-altas',
  templateUrl: './inscripciones-altas.component.html',
  styleUrls: ['./inscripciones-altas.component.scss'],
})
export class InscripcionesAltasComponent implements OnDestroy{
  inscripcionesForm: FormGroup = new FormGroup({});
  isNewRecord = !this.data;

  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  destroyed$ = new Subject<void>();


  materiaControl = new FormControl(!this.isNewRecord ? this.data.materia : '', [
    Validators.required,
  ]);

  alumnosControl = new FormControl(
    !this.isNewRecord ? this.data.alumno : '',
    [Validators.required]
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Inscripcion,
    private dialogRef: MatDialogRef<InscripcionesAltasComponent>,
    private alumnosService: AlumnosService,
    private cursosService: CursosService
  ) {
    this.inscripcionesForm = new FormGroup({
      materia: this.materiaControl,
      alumnos: this.alumnosControl,
    });
    this.cursosService.getCursos().subscribe(curso => this.cursos = curso)
    this.alumnosService.getAlumnos().subscribe((alumno) => { this.alumnos = alumno });
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // getAlumnos(){
  //   this.alumnosService.getAlumnos().subscribe((alumno) => {
  //     this.alumnos = alumno;
  //   });
  //   console.log(this.alumnos)
  //   return this.alumnos
  // }

  onSubmit(): void {
    if (this.inscripcionesForm.valid) {
      const newInscripcion = {
        ...this.data,
        id: this.data ? this.data.id : undefined,
        materia: this.materiaControl.value,
        alumnos: this.alumnosControl.value,
      };
      this.dialogRef.close(newInscripcion);
    }
  }
}
