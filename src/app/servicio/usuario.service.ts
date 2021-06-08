import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../modelo/Usuario';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends Error {
  private usuarioUrl: string = '/api/usuarios';

  //==================================================================CONSTRUCTOR
  constructor(private http: HttpClient) {
    super();
  }

  //======================================================================================
  //==============================METODOS OBSERVABLES=====================================
  //======================================================================================

  getUsuarios(): Observable<Usuario[]> {
    try {
      return this.http.get<Usuario[]>(this.usuarioUrl).pipe(
        tap((col) => this.log(`Usuarios existentes`)),
        catchError(this.handleError('getUsuarios', []))
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  getUsuarioId(id: number): Observable<Usuario> {
    try {
      const url = `${this.usuarioUrl}/${id}`;
      return this.http.get<Usuario>(url).pipe(
        tap((_) => this.log(`Usuario creado id=${id}`)),
        catchError(this.handleError<Usuario>(`getUsuarioId=${id}`))
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    try {
      return this.http
        .post<Usuario>(this.usuarioUrl + '/crear', usuario, httpOptions)
        .pipe(
          tap((usuario: Usuario) =>
            this.log(`Usuario guardado w/ id=${usuario.idUsuario}`)
          ),
          catchError(this.handleError<Usuario>('agregarUsuario'))
        );
    } catch (error) {
      throw new Error(error);
    }
  }

  actuaizarUsuario(usuario: Usuario): Observable<null> {
    try {
      return this.http
        .put(this.usuarioUrl + '/actualizar', usuario, httpOptions)
        .pipe(
          tap((_) => this.log(`updated user id=${usuario.cargo.idCargo}`)),
          catchError(this.handleError<any>('actuaizarUsuario'))
        );
    } catch (error) {
      throw new Error(error);
    }
  }

  eliminarUsuario(id: string): Observable<Usuario> {
    try {
      const url = `${this.usuarioUrl}/${id}`;
      return this.http.delete<Usuario>(url, httpOptions).pipe(
        tap((_) => this.log(`Usuario eliminado id=${id}`)),
        catchError(this.handleError<Usuario>('eliminarUsuario'))
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('UserService: ' + message);
  }
}
