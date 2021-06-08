import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicio/usuario.service';
import { Usuario } from '../../modelo/Usuario';
import { CargoService } from '../../servicio/cargo.service';
import { Cargo } from 'src/app/modelo/Cargo';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent extends Error implements OnInit {
  public cargos: Cargo[] = [];
  user = new Usuario();
  guardado: boolean = false;
  noguardado: boolean = true;

  constructor(
    public usuarioService: UsuarioService,
    public cargoService: CargoService
  ) {
    super();
  }

  ngOnInit(): void {
    try {
      this.cargoService.getCargos().subscribe((data) => {
        this.cargos = data;
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  guardarUsuario(
    nombres: HTMLInputElement,
    apellidos: HTMLInputElement,
    usuario: HTMLInputElement,
    edad: HTMLInputElement,
    fecha: HTMLInputElement,
    idCargo: HTMLSelectElement
  ) {
    try {
      if (nombres.value==""||
        apellidos.value==""||
        usuario.value==""||
        edad.value==""||
        fecha.value==""||
        idCargo.value=="0") {
        alert("Verifique los campos");
      } else {
        this.user.nombres = nombres.value;
      this.user.apellidos = apellidos.value;
      this.user.usuario = usuario.value;
      this.user.edad = Number(edad.value);
      this.user.fechaIngreso = fecha.value;
      this.user.cargo.idCargo = Number(idCargo.value);
      this.usuarioService.agregarUsuario(this.user).subscribe((data) => {
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
