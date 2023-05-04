import { Component } from '@angular/core';
import { Inscripcion } from './models';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { InscripcionesService } from './services/inscripciones.service';
import { InscripcionesAltasComponent } from './pages/inscripciones-altas/inscripciones-altas.component';
import { DeleteDialogComponent } from './pages/delete-dialog/delete-dialog.component';

const milisecondsHour = 3600000;

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {

  randomHours = function getRandomInt(top: number) {
    return Math.floor(Math.random() * top);
  };

  dataSource = new MatTableDataSource<Inscripcion>();

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,) {
    this.inscripcionesService.getInscripciones().subscribe(inscripciones => {
      this.dataSource.data = inscripciones;
    })
  }

  abrirAltas(): void {
    const dialog = this.matDialog.open(InscripcionesAltasComponent);
    dialog.disableClose = true;
    dialog.afterClosed().subscribe((valor) => {
      this.add(valor);
    });
  }

  abrirEdicion(inscripcion: Inscripcion){
    const dialog = this.matDialog.open(InscripcionesAltasComponent, {
      data: inscripcion
    })
    dialog.disableClose = true;
    dialog.afterClosed().subscribe((response) => {
      this.onModify(response);
    });
  }

  eliminarUsuario(inscripcion: Inscripcion) {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: inscripcion,
    });
    dialog.disableClose = true;
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.delete(inscripcion);
      }
    });
  }

  add(inscripcion: Inscripcion) {
    if (inscripcion.estudiantes || inscripcion.materia || inscripcion.grupo) {
      inscripcion = {
        ...inscripcion,
        id: this.dataSource.data[this.dataSource.data.length - 1].id + 1,
        startDate: new Date(Date.now() + this.randomHours(10000) * milisecondsHour)
      };
      this.dataSource.data.push(inscripcion);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    }
  }

  delete(inscripcion: Inscripcion): void {
    this.dataSource.data.splice(this.dataSource.data.indexOf(inscripcion), 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  onModify(inscripcion: Inscripcion){
    const index = this.dataSource.data.findIndex(ins => {
      return ins.id === inscripcion.id
    })
    this.dataSource.data[index] = inscripcion;
    
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  details(inscripcionId: number): void {
    this.router.navigate([inscripcionId], {
      relativeTo: this.activatedRoute,
    });
  }

  displayedColumns: string[] = [
    'id',
    'estudiantes',
    'materia',
    'grupo',
    'startDate',
    'accion'
  ];

}
