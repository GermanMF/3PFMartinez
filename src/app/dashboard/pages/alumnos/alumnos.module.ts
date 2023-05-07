import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';


import { AlumnosAltasComponent } from './pages/alumnos-altas/alumnos-altas.component';
import { AlumnosDetallesComponent } from './pages/alumnos-detalles/alumnos-detalles.component';
import { DeleteDialogComponent } from './pages/delete-dialog/delete-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AlumnosAltasComponent,
    AlumnosComponent,
    AlumnosDetallesComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlumnosComponent,
      },
      {
        path: ':id',
        component: AlumnosDetallesComponent,
      }
    ])
  ],
  exports: [AlumnosComponent]
})
export class AlumnosModule { }
