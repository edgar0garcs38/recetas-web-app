// src/app/pages/favoritos/favoritos.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';      // trae NgIf, NgFor, date pipe
import { Router } from '@angular/router';            // ✅ importa Router, no RouterModule
import { Receta } from '../../models/receta.model';
import { RecetaService } from '../../services/receta.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule], // ✅ RouterModule no es necesario aquí salvo que uses directivas <router-outlet> o [routerLink]
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit, OnDestroy {
  favoritas: Receta[] = [];
  private sub?: Subscription;

  // ✅ Inyecta Router correctamente
  constructor(private rs: RecetaService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.rs.getRecetas().subscribe(list => {
      this.favoritas = list.filter(r => r.favorita);
    });
  }

  verDetalle(id: string) {
    // ✅ ejemplo de navegación
    this.router.navigate(['/receta', id]);
  }

  editar(id: string) {
    this.router.navigate(['/receta', id, 'editar']);
  }

  eliminar(id: string) {
    if (confirm('¿Eliminar esta receta de favoritas?')) {
      this.rs.delete(id);
    }
  }

  toggleFavorita(id: string) {
    this.rs.toggleFavorita(id);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
