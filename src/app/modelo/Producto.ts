import { Usuario } from "./Usuario";

export class Producto {


  public idProducto:number=0;
  public nombreProducto :string="";
  public cantidad:number=0;
  public fechaIngreso:string="";
  public usuario:Usuario;

  constructor(
    ) {
        this.idProducto = 0
        this.nombreProducto = ""
        this.cantidad = 0
        this.fechaIngreso = ""
        this.usuario = new Usuario()
      }


}
