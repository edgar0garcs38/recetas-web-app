import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { FormRecetaComponent } from './components/form-receta/form-receta.component';
import { DetalleRecetaComponent } from './components/detalle-receta/detalle-receta.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'agregar', component: FormRecetaComponent },
  { path: 'editar/:id', component: FormRecetaComponent },
  { path: 'receta/:id', component: DetalleRecetaComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
