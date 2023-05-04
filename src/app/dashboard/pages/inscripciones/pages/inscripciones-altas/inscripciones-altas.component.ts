import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion } from '../../models';

@Component({
  selector: 'app-inscripciones-altas',
  templateUrl: './inscripciones-altas.component.html',
  styleUrls: ['./inscripciones-altas.component.scss'],
})
export class InscripcionesAltasComponent {
  inscripcionesForm: FormGroup = new FormGroup({});
  isNewRecord = !this.data;

  alumnosList: string[] = [
    'Jaime Mausan',
    'Chorofilo Ramirez',
    'Talon de Aquiles',
    'Quelite Chiron',
    'Taraumara Perez',
    'Cuahtemoc Azul',
    'Toribio Malón',
    'Soyla Bacan',
    'Mercedes Bens',
    'Heberto Ledezma',
    'Messi Ramón',
    'Telerín Fernández',
    'Telaviv Rasputia',
    'Jeronimo Valdez',
    'Rafita Valderrama',
    'Cesar Pérez',
    'Polonio Radón',
    'Sofía Pérez',
    'Selenio Hidrógenez',
    'Sanpakuto Zanahorio',
    'Querubina Joseph',
    'Cerre Siete',
    'Elba Nanero',
    'Salomon Bibliez',
    'Pogba Germain',
    'Neil Armstrong',
    'Sardino Enriquez',
    'Naruto Haruno',
  ];

  materiaControl = new FormControl(!this.isNewRecord ? this.data.materia : '', [
    Validators.required,
  ]);
  grupoControl = new FormControl(
    !this.isNewRecord ? this.data.grupo : ['A', 'B', 'C', 'D'],
    [Validators.required]
  );

  estudiantesControl = new FormControl(
    !this.isNewRecord ? this.data.estudiantes : '',
    [Validators.required]
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Inscripcion,
    private dialogRef: MatDialogRef<InscripcionesAltasComponent>
  ) {
    this.inscripcionesForm = new FormGroup({
      materia: this.materiaControl,
      estudiantes: this.estudiantesControl,
      grupo: this.grupoControl,
    });
  }

  onSubmit(): void {
    if (this.inscripcionesForm.valid) {
      const newInscripcion = {
        ...this.data,
        id: this.data ? this.data.id : undefined,
        materia: this.materiaControl.value,
        estudiantes: this.estudiantesControl.value,
        grupo: this.grupoControl.value,
      };
      this.dialogRef.close(newInscripcion);
    }
  }
}
