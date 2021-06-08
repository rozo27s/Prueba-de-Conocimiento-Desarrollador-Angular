import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Actualizacion} from '../modelo/Actualizacion';
import {of} from "rxjs";

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class ActualizacionService {
  private urlActualizacion: string = '/api/actualizaciones';

    //==================================================================CONSTRUCTOR
    constructor (private http: HttpClient) {}

    //======================================================================================
    //==============================METODOS OBSERVABLES=====================================
    //======================================================================================

    getActualizacion(): Observable<Actualizacion[]> {
      try{
      return this.http.get<Actualizacion[]>(this.urlActualizacion)
        .pipe(
          tap(col => this.log(`Actualizacion`)),
          catchError(this.handleError('getActualizacion', []))
        );
      } catch (error) {
        throw new Error("");
      }
    }

    getActualizacionId(id: number): Observable<Actualizacion> {
      try{
      const url = `${this.urlActualizacion}/${id}`;
      return this.http.get<Actualizacion>(url).pipe(
        tap(_ => this.log(`Producto creado id=${id}`)),
        catchError(this.handleError<Actualizacion>(`getActualizacionId=${id}`))
      );
    } catch (error) {
      throw new Error(error);
    }
    }

    agregarActualizacion (actualizacion: Actualizacion): Observable<Actualizacion> {
      try{
      return this.http.post<Actualizacion>(this.urlActualizacion+"/crear", actualizacion, httpOptions).pipe(
        tap((usuario: Actualizacion) => this.log(`Actualizacion agregada w/ id=${actualizacion.idActualizacion}`)),
        catchError(this.handleError<Actualizacion>('agregarActualizacion'))
      );
    } catch (error) {
      throw new Error(error);
    }
    }

    actuaizarActualizacion (actualizacion: Actualizacion): Observable<null> {
      try{
      return this.http.put(this.urlActualizacion+"/actualizar", actualizacion, httpOptions).pipe(
        tap(_ => this.log(`Actualizacion actualizado id=${actualizacion.idActualizacion}`)),
        catchError(this.handleError<any>('actuaizarActualizacion'))
      );
    } catch (error) {
      throw new Error(error);
    }
    }

    eliminarActualizacion(id: string): Observable<Actualizacion> {
      try{
      const url = `${this.urlActualizacion}/${id}`;
      return this.http.delete<Actualizacion>(url, httpOptions).pipe(
        tap(_ => this.log(`Actualizacion eliminado id=${id}`)),
        catchError(this.handleError<Actualizacion>('eliminarActualizacion'))
      );
    } catch (error) {
      throw new Error(error);
    }
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
      };
    }

    private log(message: string) {
      console.log('UserService: ' + message);
    }
  }
