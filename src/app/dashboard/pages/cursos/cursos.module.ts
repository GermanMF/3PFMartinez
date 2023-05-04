import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
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

import { CursosAltasComponent } from './pages/cursos-altas/cursos-altas.component';
import { CursosDetallesComponent } from './pages/cursos-detalles/cursos-detalles.component';
import { DeleteDialogComponent } from './pages/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    CursosAltasComponent,
    CursosDetallesComponent,
    CursosComponent,
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
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: CursosComponent,
    },
    {
      path: ':id',
      component: CursosDetallesComponent,
    }
    ])
  ],
  exports: [CursosComponent]
})
export class CursosModule { }
