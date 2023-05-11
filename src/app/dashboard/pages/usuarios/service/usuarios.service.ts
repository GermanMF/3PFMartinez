import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/core/models';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient
      .get<Usuario[]>(`${environment.apiBaseUrl}/usuarios`)
      .pipe(map((response) => response));
  }

  

  getUsuarioById(id: number): Observable<Usuario | undefined> {
    return this.httpClient
      .get<Usuario>(`${environment.apiBaseUrl}/usuarios/${id}`)
      .pipe(map((response) => response));
  }

  addUsuarios(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(
      `${environment.apiBaseUrl}/usuarios`,
      usuario
    );
  }

  updateUsuarios(usuario: Usuario, id:number): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${environment.apiBaseUrl}/usuarios/${id}`,usuario)
  }

  deleteUsuarios(id: number): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(`${environment.apiBaseUrl}/usuarios/${id}`)
  }
}
