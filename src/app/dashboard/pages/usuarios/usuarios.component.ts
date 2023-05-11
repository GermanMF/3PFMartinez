import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Usuario } from '../../../core/models/index';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UsuariosService } from './service/usuarios.service';
import { UsuariosAltasComponent } from './usuarios-altas/usuarios-altas.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  dataSource = new MatTableDataSource<Usuario>();

  destroyed$ = new Subject<void>();
  authUser$: Observable<Usuario | null>;

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.getAuthUser();
    this.usuariosService.getUsuarios().subscribe((usuarios) => {
      this.dataSource.data = usuarios;
    });
  }

  abrirAltas(): void {
    const dialog = this.matDialog.open(UsuariosAltasComponent);
    dialog.disableClose = true;
    dialog.afterClosed().subscribe((valor) => {
      this.add(valor);
    });
  }

  abrirEdicion(usuario: Usuario) {
    const dialog = this.matDialog.open(UsuariosAltasComponent, {
      data: usuario,
    });
    dialog.disableClose = true;
    dialog.afterClosed().subscribe((valor) => {
      this.modify(valor);
    });
  }

  eliminarUsuario(usuario: Usuario) {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: usuario,
    });
    dialog.disableClose = true;
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.delete(usuario);
      }
    });
  }

  add(usuario: Usuario) {
    if (usuario.nombre || usuario.apellido || usuario.email || usuario.role || usuario.password) {
      usuario = {
        ...usuario,
        id: this.dataSource.data[this.dataSource.data.length - 1].id + 1,
      };
      this.usuariosService
        .addUsuarios(usuario)
        .subscribe((newUsuario) => newUsuario);
      this.dataSource.data.push(usuario);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    }
  }

  delete(usuario: Usuario): void {
    this.usuariosService.deleteUsuarios(usuario.id).subscribe();
    this.dataSource.data.splice(this.dataSource.data.indexOf(usuario), 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  modify(usuario: Usuario) { 
    const index = this.dataSource.data.findIndex((usuarioI) => {
      return usuarioI.id === usuario.id;
    });
    this.usuariosService
        .updateUsuarios(usuario, usuario.id)
        .subscribe((uusuario) => usuario.id = uusuario.id);
    this.dataSource.data[index] = usuario;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  details(usuarioId: number): void {
    this.router.navigate([usuarioId], {
      relativeTo: this.activatedRoute,
    });
  }

  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'email',
    'role',
    'accion',
  ];

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
