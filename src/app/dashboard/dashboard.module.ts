import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
// Cuando se implementa el forChild, no se importan los modulos por que se crearian rutas extrañas
// import { AlumnosModule } from './pages/alumnos/alumnos.module';
// import { CursosModule } from './pages/cursos/cursos.module';
// import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { RouterModule, Routes } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { AuthService } from '../auth/services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./pages/cursos/cursos.module').then((n) => n.CursosModule)
  },
  {
    path: 'inscripciones',
    loadChildren: () => import('./pages/inscripciones/inscripciones.module').then((l) => l.InscripcionesModule)
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    // AlumnosModule,
    // CursosModule,
    // InscripcionesModule,
    RouterModule.forChild(routes)
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
