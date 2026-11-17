// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { ListaRecetasComponent } from './components/lista-recetas/lista-recetas.component';
import { FormRecetaComponent } from './components/form-receta/form-receta.component';
import { DetalleRecetaComponent } from './components/detalle-receta/detalle-receta.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';

@NgModule({
  declarations: [],
  imports: [
    FormRecetaComponent,
    DetalleRecetaComponent,
    InicioComponent,
    ListaRecetasComponent,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FavoritosComponent,
    HeaderComponent,
    AppComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
