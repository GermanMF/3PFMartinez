import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-altas',
  templateUrl: './alumnos-altas.component.html',
  styleUrls: ['./alumnos-altas.component.scss'],
})
export class AlumnosAltasComponent {
  alumnosForm: FormGroup = new FormGroup({});
  isNewRecord = !this.data;

  materiasList: string[] = [
    'Matemáticas',
    'Español',
    'Ciencias Naturales',
    'Civismo',
  ];

  nombreControl = new FormControl(
    !this.isNewRecord ? this.data.firstName : '',
    [Validators.required, Validators.minLength(3), Validators.maxLength(15)]
  );
  apellidoControl = new FormControl(
    !this.isNewRecord ? this.data.lastName : '',
    [Validators.required, Validators.minLength(3), Validators.maxLength(15)]
  );
  locacionControl = new FormControl(!this.isNewRecord ? (this.data.online ? 'true' : 'false'): '', [
    Validators.required,
  ]);
  materiaControl = new FormControl(
    !this.isNewRecord ? this.data.materias : '',
    [Validators.required]
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
    private dialogRef: MatDialogRef<AlumnosAltasComponent>
  ) {
    this.alumnosForm = new FormGroup({
      firstName: this.nombreControl,
      lastName: this.apellidoControl,
      materias: this.materiaControl,
      online: this.locacionControl,
    });
  }

  onSubmit(): void {
    if (this.alumnosForm.valid) {
      const newAlumno = {
        ...this.data,
        id: this.data ? this.data.id : undefined,
        firstName: this.nombreControl.value,
        lastName: this.apellidoControl.value,
        materias: this.materiaControl.value,
        online: this.locacionControl.value === 'true',
        update: new Date(),
        // espanol: 0,
        // matematicas: 0,
        // cienciasNaturales: 0,
        // civismo: 0,
      };

      this.dialogRef.close(newAlumno);
    }
  }
}
