import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cargo } from '../modelo/Cargo';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class CargoService {
  private cargosUrl: string = '/api/cargos';
  private urlGuardarCargo: string = '/api/cargos/crear';
  constructor(private http: HttpClient) {}

  getCargos(): Observable<Cargo[]> {
    try {
      return this.http.get<Cargo[]>(this.cargosUrl).pipe(
        tap((col) => this.log(`Cargos existentes`)),
        catchError(this.handleError('getCargos', []))
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  addCargo(cargo: Cargo): Observable<Cargo> {
    try {
      return this.http
        .post<Cargo>(this.urlGuardarCargo, cargo, httpOptions)
        .pipe(
          tap((cargo: Cargo) =>
            this.log(`Cargo agregado w/ id=${cargo.idCargo}`)
          ),
          catchError(this.handleError<Cargo>('addCargo'))
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
