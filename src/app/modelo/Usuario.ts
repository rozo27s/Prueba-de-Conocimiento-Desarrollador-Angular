import { Cargo } from "./Cargo";

    export class Usuario {

      public idUsuario:number=0;
      public nombres:string="";
      public apellidos:string="";
      public usuario:string="";
      public edad:Number=0;
      public fechaIngreso:string="";
      public cargo:Cargo;

      constructor(
    ) {
        this.idUsuario = 0
        this.usuario = ""
        this.nombres = ""
        this.apellidos = ""
        this.edad = 0
        this.fechaIngreso = ""
        this.cargo = new Cargo();
      }
    }
