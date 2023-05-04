import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos-altas',
  templateUrl: './alumnos-altas.component.html',
  styleUrls: ['./alumnos-altas.component.scss']
})
export class AlumnosAltasComponent {

  alumnosForm: FormGroup = new FormGroup({});

  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  apellidoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  locacionControl = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
    private dialogRef: MatDialogRef<AlumnosAltasComponent>,){
    this.alumnosForm = new FormGroup({
      firstName: this.nombreControl,
      lastName: this.apellidoControl,
      online: this.locacionControl
    });
  }

  onSubmit(): void {
    if (this.alumnosForm.valid) {
        const newAlumno = {
        ...this.data,
        id: this.data ? this.data.id : undefined,
        firstName: this.nombreControl.value,
        lastName: this.apellidoControl.value,
        online: this.locacionControl.value==="true",
        update: new Date(),
        espanol: 0,
        matematicas: 0,
        cienciasNaturales: 0,
        civismo: 0,
      };

      this.dialogRef.close(newAlumno);
    }
  }

  

}

