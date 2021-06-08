import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelo/Producto';
import { Usuario } from 'src/app/modelo/Usuario';
import { UsuarioService } from '../../servicio/usuario.service';
import { ProductoService } from '../../servicio/producto.service';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent extends Error implements OnInit {
  usuarios: Usuario[] = [];
  produc=new Producto();
  guardado:boolean=false;
  noguardado:boolean=true;


  constructor(
    public usuarioService: UsuarioService,
    public productoService: ProductoService
  ) {
    super();
  }

  ngOnInit(): void {
    try {
      this.usuarioService.getUsuarios().subscribe((data) => {
        this.usuarios = data;
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  guardarProducto(nombrePro:HTMLInputElement,cantidad:HTMLInputElement,fecha:HTMLInputElement,idUsuario:HTMLSelectElement){
    try {
      if (nombrePro.value==""||cantidad.value==""||fecha.value==""||idUsuario.value=="0") {
        alert("Complete todos los campos");
      } else {
        this.produc.nombreProducto=nombrePro.value;
        this.produc.cantidad=Number(cantidad.value);
        this.produc.fechaIngreso=fecha.value;
        this.produc.usuario.idUsuario=Number(idUsuario.value);
        this.productoService.agregarProducto(this.produc).subscribe((data) => {
          if (data) {
            this.guardado = true;
            this.noguardado = true;
          } else {
            this.noguardado = false;
            this.guardado = false;
          }
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

}
