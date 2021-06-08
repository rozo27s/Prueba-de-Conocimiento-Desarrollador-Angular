import { Producto } from "./Producto";
import { Usuario } from "./Usuario";

export class Actualizacion {
  public idActualizacion:number=0;
  public fechaActualizacion:string="";
  public producto:Producto;
  public usuario:Usuario;


  constructor(
) {
    this.idActualizacion = 0
    this.fechaActualizacion = ""
    this.producto = new Producto();
    this.usuario = new Usuario();
  }

}
