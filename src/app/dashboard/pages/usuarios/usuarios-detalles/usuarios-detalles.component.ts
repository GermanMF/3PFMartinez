import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-usuarios-detalles',
  templateUrl: './usuarios-detalles.component.html',
  styleUrls: ['./usuarios-detalles.component.scss']
})
export class UsuariosDetallesComponent {
  usuario: Usuario | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {
    this.usuariosService
      .getUsuarioById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((usuarios) => {
        this.usuario = usuarios;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
