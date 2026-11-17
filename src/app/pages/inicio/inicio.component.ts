import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaRecetasComponent } from '../../components/lista-recetas/lista-recetas.component';

@Component({
  selector: 'app-inicio',
  standalone: true,   // ✅ ahora es standalone
  imports: [
    CommonModule,          // ✅ para *ngIf, *ngFor, pipes
    ListaRecetasComponent  // ✅ importa el componente hijo
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {}
