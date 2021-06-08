import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Producto } from '../modelo/Producto';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends Error {
  private urlProducto: string = '/api/productos';

  //==================================================================CONSTRUCTOR
  constructor(private http: HttpClient) {
    super();
  }

  //======================================================================================
  //==============================METODOS OBSERVABLES=====================================
  //======================================================================================



  getProductoId(id: number): Observable<Producto> {
    try {
      const url = `${this.urlProducto}/${id}`;
      return this.http.get<Producto>(url).pipe(
        tap((_) => this.log(`consulta =${id}`)),
        catchError(this.handleError<Producto>(`getProductoId=${id}`))
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  getProductos(): Observable<Producto[]> {
    try {
      return this.http.get<Producto[]>(this.urlProducto).pipe(
        tap((col) => this.log(`Productos`)),
        catchError(this.handleError('getUsuarios', []))
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  getProductoNombre(cadena: string): Observable<Producto[]> {
    try {
      return this.http.get<Producto[]>(this.urlProducto+"/nombre/"+cadena).pipe(
        tap((col) => this.log(`Productos`)),
        catchError(this.handleError('getUsuarios', []))
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    try {
      return this.http
        .post<Producto>(this.urlProducto + '/crear', producto, httpOptions)
        .pipe(
          tap((producto: Producto) =>
            this.log(`Producto agregado w/ id=${producto.idProducto}`)
          ),
          catchError(this.handleError<Producto>('agregarProducto'))
        );
    } catch (error) {
      throw new Error(error);
    }
  }

  actuaizarProducto(producto: Producto): Observable<null> {
    try {
      return this.http
        .post(this.urlProducto + '/actualizar', producto, httpOptions)
        .pipe(
          tap((_) =>
            this.log(`Producto actualizado id=${producto.idProducto}`)
          ),
          catchError(this.handleError<any>('actuaizarProducto'))
        );
    } catch (error) {
      throw new Error(error);
    }
  }

  eliminarProducto(id: string): Observable<Producto> {
    try {
      const url = `${this.urlProducto}/${id}`;
      return this.http.delete<Producto>(url, httpOptions).pipe(
        tap((_) => this.log(`Producto eliminado id=${id}`)),
        catchError(this.handleError<Producto>('eliminarProducto'))
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
