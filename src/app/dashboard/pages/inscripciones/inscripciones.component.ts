import { Component, OnDestroy } from '@angular/core';
// import { Inscripcion } from './models';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

// import { InscripcionesService } from './services/inscripciones.service';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { CursosService } from '../cursos/services/cursos.service';
import { InscripcionesAltasComponent } from './pages/inscripciones-altas/inscripciones-altas.component';
import { DeleteDialogComponent } from './pages/delete-dialog/delete-dialog.component';
import { Usuario } from 'src/app/core/models';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Alumno } from '../alumnos/models';
import { Curso } from '../cursos/models';
import { Inscripcion } from './models';

const milisecondsHour = 3600000;

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnDestroy {
  dataSource = new MatTableDataSource<Inscripcion>();

  destroyed$ = new Subject<void>();
  authUser$: Observable<Usuario | null>;

  randomHours = function getRandomInt(top: number) {
    return Math.floor(Math.random() * top);
  };

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    // private inscripcionesService: InscripcionesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.getAuthUser();
    this.alumnosService.getAlumnos().subscribe((alumnos) => {
      alumnos.forEach((alumno, index) => {
        alumno.materias.forEach((materia) => {
          this.dataSource.data.push({
            id: index+1,
            materia: materia,
            materia_id: materia.id,
            alumno: alumno,
            alumno_id: alumno.id
          });
        });
      });
      this.dataSource.data = this.dataSource.data
    });


  }

  // abrirAltas(): void {
  //   const dialog = this.matDialog.open(InscripcionesAltasComponent);
  //   dialog.disableClose = true;
  //   dialog.afterClosed().subscribe((valor) => {
  //     this.add(valor);
  //   });
  // }

  // abrirEdicion(inscripcion: Inscripcion) {
  //   const dialog = this.matDialog.open(InscripcionesAltasComponent, {
  //     data: inscripcion,
  //   });
  //   dialog.disableClose = true;
  //   dialog.afterClosed().subscribe((response) => {
  //     this.onModify(response);
  //   });
  // }

  // eliminarUsuario(inscripcion: Inscripcion) {
  //   const dialog = this.matDialog.open(DeleteDialogComponent, {
  //     data: inscripcion,
  //   });
  //   dialog.disableClose = true;
  //   dialog.afterClosed().subscribe((valor) => {
  //     if (valor) {
  //       this.delete(inscripcion);
  //     }
  //   });
  // }

  // add(inscripcion: Inscripcion) {
  //   // if (alumno.materias) {
  //   //   alumno = {
  //   //     ...alumno,
  //   //     id: this.dataSource.data[this.dataSource.data.length - 1].id + 1,
  //   //   };
  //   console.log(inscripcion)
  //   if (inscripcion.materia || inscripcion.alumno) {
  //     inscripcion = {
  //       ...inscripcion,
  //       id: this.dataSource.data[this.dataSource.data.length - 1].id + 1,
  //     };
  //   }
  //   console.log(inscripcion)
  //   inscripcion.alumno.materias.push({
  //     // id: inscripcion.materia[alumno.materias.length - 1].id + 1,
  //     id: inscripcion.materia.id,
  //     materia: inscripcion.materia.materia,
  //     cupos: inscripcion.materia.cupos,
  //     grupos: inscripcion.materia.grupos,
  //     tutor: inscripcion.materia.tutor
  //   })
  //   this.alumnosService.updateAlumnos(inscripcion.alumno, inscripcion.alumno_id).subscribe(uAlumno => inscripcion.alumno_id = uAlumno.id)
  //   this.dataSource.data.push(inscripcion);
  //   this.dataSource = new MatTableDataSource(this.dataSource.data);
  // }

  // delete(inscripcion: Inscripcion): void {
  //   this.dataSource.data.splice(this.dataSource.data.indexOf(inscripcion), 1);
  //   this.dataSource = new MatTableDataSource(this.dataSource.data);
  // }

  // onModify(inscripcion: Inscripcion) {
  //   const index = this.dataSource.data.findIndex((ins) => {
  //     return ins.id === inscripcion.id;
  //   });
  //   this.dataSource.data[index] = inscripcion;

  //   this.dataSource = new MatTableDataSource(this.dataSource.data);
  // }

  // details(inscripcionId: number): void {
  //   this.router.navigate([inscripcionId], {
  //     relativeTo: this.activatedRoute,
  //   });
  // }

  displayedColumns: string[] = ['id', 'alumnos', 'materia'];

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
