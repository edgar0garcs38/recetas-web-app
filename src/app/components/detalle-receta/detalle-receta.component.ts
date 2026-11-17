import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from '../../models/receta.model';
import { RecetaService } from '../../services/receta.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-receta',
  standalone: true,              // ✅ marca como standalone
  imports: [
    CommonModule,                // ✅ necesario para *ngIf, *ngFor, pipes
    RouterModule                 // ✅ necesario si usas routerLink, router-outlet, etc.
  ],
  templateUrl: './detalle-receta.component.html',
  styleUrls: ['./detalle-receta.component.scss']
})
export class DetalleRecetaComponent implements OnInit {
  receta?: Receta;

  constructor(
    private route: ActivatedRoute,
    private rs: RecetaService,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.receta = this.rs.findById(id);
      if (!this.receta) {
        this.router.navigate(['/']);
      }
    }
  }

  toggleFavorita() {
    if (this.receta) {
      this.rs.toggleFavorita(this.receta.id);
      this.receta = this.rs.findById(this.receta.id);
    }
  }
}
