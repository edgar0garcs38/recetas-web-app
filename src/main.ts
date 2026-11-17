import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { InicioComponent } from './app/pages/inicio/inicio.component';
import { FavoritosComponent } from './app/pages/favoritos/favoritos.component';
import { FormRecetaComponent } from './app/components/form-receta/form-receta.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'agregar', component: FormRecetaComponent },   // ✅ ruta para crear receta
  { path: 'editar/:id', component: FormRecetaComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));
