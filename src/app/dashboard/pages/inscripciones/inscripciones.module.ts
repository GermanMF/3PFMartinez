import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { InscripcionesAltasComponent } from './pages/inscripciones-altas/inscripciones-altas.component';
import { InscripcionesDetallesComponent } from './pages/inscripciones-detalles/inscripciones-detalles.component';
import { DeleteDialogComponent } from './pages/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    InscripcionesAltasComponent,
    InscripcionesDetallesComponent,
    InscripcionesComponent,
    DeleteDialogComponent,
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
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: InscripcionesComponent,
      },
      {
        path: ':id',
        component: InscripcionesDetallesComponent,
      },
    ]),
  ],
  exports: [InscripcionesComponent],
})
export class InscripcionesModule {}
