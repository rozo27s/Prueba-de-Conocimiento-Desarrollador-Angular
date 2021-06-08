import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
//=========
import { CargoService } from './servicio/cargo.service';
import { ProductoService } from './servicio/producto.service';
import { UsuarioService } from './servicio/usuario.service';
import { ActualizacionService } from './servicio/actualizacion.service';
//========
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { ProductoNuevoComponent } from './componentes/producto-nuevo/producto-nuevo.component';
import { ProductoListarComponent } from './componentes/producto-listar/producto-listar.component';

const appRoutes: Routes = [
  { path: 'rusuario', component: RegistrarUsuarioComponent},
  { path: 'rproducto', component: ProductoNuevoComponent},
  { path: 'lproducto', component: ProductoListarComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    RegistrarUsuarioComponent,
    ProductoNuevoComponent,
    ProductoListarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [CargoService,ProductoService,UsuarioService,ActualizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
