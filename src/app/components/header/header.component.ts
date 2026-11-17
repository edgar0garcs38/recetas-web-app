import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';       // ✅ importa CommonModule
import { Subscription } from 'rxjs';
import { Receta } from '../../models/receta.model';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,   // ✅ necesario para *ngIf, *ngFor, pipes como date
    RouterModule    // ✅ necesario para routerLink, routerLinkActive, routerLinkActiveOptions
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  favoritasCount = 0;
  private sub?: Subscription;

  constructor(private rs: RecetaService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.rs.getRecetas().subscribe((list: Receta[]) => {
      this.favoritasCount = list.filter(r => r.favorita).length;
    });
  }

  irAgregar() {
    this.router.navigate(['/agregar']);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
