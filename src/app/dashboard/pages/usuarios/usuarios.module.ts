import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAltasComponent } from './usuarios-altas/usuarios-altas.component';
import { UsuariosDetallesComponent } from './usuarios-detalles/usuarios-detalles.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminGuard } from '../../../core/auth/guards/admin.guard';



@NgModule({
  declarations: [
    UsuariosAltasComponent,
    UsuariosDetallesComponent,
    UsuariosComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
      },
      {
        path: ':id',
        component: UsuariosDetallesComponent,
      },
    ])
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }
