import { Component, Inject } from '@angular/core';
import { Alumno } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-alumnos-editar',
  templateUrl: './alumnos-editar.component.html',
  styleUrls: ['./alumnos-editar.component.scss']
})
export class AlumnosEditarComponent {
  alumnosForm: FormGroup = new FormGroup({});

  nombreControl = new FormControl(this.data.firstName, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  apellidoControl = new FormControl(this.data.lastName, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  locacionControl = new FormControl(this.data.online ? 'true' : 'false', [Validators.required]);
  matematicasControl = new FormControl(this.data.matematicas, [
    Validators.required,
    Validators.min(5),
    Validators.max(10),
  ]);
  espanolControl = new FormControl(this.data.espanol, [
    Validators.required,
    Validators.min(5),
    Validators.max(10),
  ]);
  cienciasNaturalesControl = new FormControl(this.data.cienciasNaturales, [
    Validators.required,
    Validators.min(5),
    Validators.max(10),
  ]);
  civismoControl = new FormControl(this.data.civismo, [
    Validators.required,
    Validators.min(5),
    Validators.max(10),
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
    private dialogRef: MatDialogRef<AlumnosEditarComponent>
  ) {
    this.alumnosForm = new FormGroup({
      firstName: this.nombreControl,
      lastName: this.apellidoControl,
      online: this.locacionControl,
      matematicas: this.matematicasControl,
      espanol: this.espanolControl,
      cienciasNaturales: this.cienciasNaturalesControl,
      civismo: this.civismoControl,
    });
  }

  onSubmit(): void {
    if (this.alumnosForm.valid) {
      const editAlumno = {
        ...this.data,
        id: this.data.id,
        firstName: this.nombreControl.value,
        lastName: this.apellidoControl.value,
        online: this.locacionControl.value === 'true',
        update: new Date(),
        espanol: this.espanolControl.value,
        matematicas: this.matematicasControl.value,
        cienciasNaturales: this.cienciasNaturalesControl.value,
        civismo: this.civismoControl.value,
      };

      this.dialogRef.close(editAlumno);
    }
  }
}

