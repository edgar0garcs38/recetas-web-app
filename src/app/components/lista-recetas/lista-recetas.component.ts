import { Component, OnInit } from '@angular/core';
import { Receta } from '../../models/receta.model';
import { RecetaService } from '../../services/receta.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-recetas',
  standalone: true,   // ✅ ahora es standalone
  imports: [
    CommonModule,     // ✅ para *ngIf, *ngFor, pipes
    FormsModule,      // ✅ para [(ngModel)]
    RouterModule      // ✅ para routerLink si lo usas en la plantilla
  ],
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.scss']
})
export class ListaRecetasComponent implements OnInit {
  recetas: Receta[] = [];
  filtro = '';

  constructor(private rs: RecetaService, private router: Router) {}

  ngOnInit() {
    this.rs.getRecetas().subscribe(list => {
      this.recetas = list;
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/receta', id]);
  }

  editar(id: string) {
    this.router.navigate(['/editar', id]);
  }

  eliminar(id: string) {
    if (confirm('¿Eliminar esta receta?')) {
      this.rs.delete(id);
    }
  }

  toggleFavorita(id: string) {
    this.rs.toggleFavorita(id);
  }
}
