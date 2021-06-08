import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelo/Producto';
import { Usuario } from 'src/app/modelo/Usuario';
import { Actualizacion } from 'src/app/modelo/Actualizacion';
import { UsuarioService } from '../../servicio/usuario.service';
import { ProductoService } from '../../servicio/producto.service';
import { ActualizacionService } from '../../servicio/actualizacion.service';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css'],
})
export class ProductoListarComponent extends Error implements OnInit {
  usuarios: Usuario[] = [];
  productos: Producto[] = [];
  producTmp = new Producto();
  pro = new Producto();
  usu = new Usuario();
  act = new Actualizacion();
  guardado: boolean = false;
  noguardado: boolean = true;
  constructor(
    public usuarioService: UsuarioService,
    public productoService: ProductoService,
    public actualizacionService: ActualizacionService
  ) {
    super();
  }

  ngOnInit(): void {
    try {
      this.usuarioService.getUsuarios().subscribe((data) => {
        this.usuarios = data;
      });
      this.productoService.getProductos().subscribe((data) => {
        this.productos = data;
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  getProductosPorindicio(cadena: HTMLInputElement) {
    try {
      if (cadena.value.length > 0) {
        this.productoService
          .getProductoNombre(cadena.value)
          .subscribe((data) => {
            this.productos = data;
          });
      } else {
        this.productoService.getProductos().subscribe((data) => {
          this.productos = data;
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  actualizarProducto(
    nombre: HTMLInputElement,
    cantidad: HTMLInputElement,
    fecha: HTMLInputElement,
    idUsuario:HTMLSelectElement,
    producto: Producto
  ) {
    try {
      if (nombre.value == '' || cantidad.value == '0' || fecha.value == '') {
        alert('Verifique los campos vacíos');
      } else {
        if(!(idUsuario.value=="0")){
          producto.nombreProducto = nombre.value;
        producto.cantidad = Number(cantidad.value);
        producto.fechaIngreso = fecha.value;
        this.productoService.actuaizarProducto(producto).subscribe((data) => {
          if (data) {
            const tiempoTranscurrido = Date.now();
            const hoy = new Date(tiempoTranscurrido);
            this.act.fechaActualizacion=hoy.toISOString().slice(0, 10);
            this.act.producto.idProducto=producto.idProducto;
            this.act.usuario.idUsuario=Number(idUsuario.value)
            console.log(hoy);
            this.actualizacionService.agregarActualizacion(this.act).subscribe((data) => {

            });
            this.productoService.getProductos().subscribe((data) => {
              this.productos = data;
            });
            alert('Producto actalizado');
          } else {
            alert('Verifique los campos');
          }
        });
        }else{
          alert('Seleccione un usuario para registro de actualización');
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  eliminarProducto(producto: Producto, idUsuario:HTMLSelectElement) {
    try {
      if (idUsuario.value == "0") {
        alert('No se ha seleccionado un usuario para eliminar el producto');
      } else {
        if (producto.usuario.idUsuario == Number(idUsuario.value)) {
          this.productoService.eliminarProducto(""+producto.idProducto).subscribe((data) => {
            if (data) {
              this.productoService.getProductos().subscribe((data) => {
                this.productos = data;
              });
              alert('Producto eliminado');
            } else {
              alert('Producto no eliminado');
            }
          });
        } else {
          alert(
            'El Usuario actual no tiene autorización para eliminar este producto'
          );
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
