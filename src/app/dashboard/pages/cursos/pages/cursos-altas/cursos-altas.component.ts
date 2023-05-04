import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../../models';

@Component({
  selector: 'app-cursos-altas',
  templateUrl: './cursos-altas.component.html',
  styleUrls: ['./cursos-altas.component.scss'],
})
export class CursosAltasComponent {
  cursosForm: FormGroup = new FormGroup({});
  isNewRecord = !this.data;

  materiaControl = new FormControl(!this.isNewRecord ? this.data.materia : '', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  cuposControl = new FormControl(!this.isNewRecord ? this.data.cupos : '', [
    Validators.required,
    Validators.min(5),
    Validators.max(20),
  ]);
  gruposControl = new FormControl(!this.isNewRecord ? this.data.grupos : '', [
    Validators.required,
    Validators.min(1),
    Validators.max(5),
  ]);
  tutorControl = new FormControl(!this.isNewRecord ? this.data.tutor : '', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Curso,
    private dialogRef: MatDialogRef<CursosAltasComponent>
  ) {
    this.cursosForm = new FormGroup({
      materia: this.materiaControl,
      cupos: this.cuposControl,
      grupos: this.gruposControl,
      tutor: this.tutorControl,
    });
  }

  onSubmit(): void {
    if (this.cursosForm.valid) {
      const newCurso = {
        ...this.data,
        id: this.data ? this.data.id : undefined,
        materia: this.materiaControl.value,
        cupos: this.cuposControl.value,
        grupos: this.gruposControl.value,
        tutor: this.tutorControl.value,
      };
      this.dialogRef.close(newCurso);
    }
  }
}
