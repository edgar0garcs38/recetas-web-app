import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Receta } from '../models/receta.model';

const STORAGE_KEY = 'recetas_app_v1';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private recetas$: BehaviorSubject<Receta[]>;

  constructor() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const initial: Receta[] = raw ? JSON.parse(raw) : this.sampleData();
    this.recetas$ = new BehaviorSubject<Receta[]>(initial);
  }

  // observable para suscribirse
  getRecetas() {
    return this.recetas$.asObservable();
  }

  private save(recetas: Receta[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recetas));
    this.recetas$.next(recetas);
  }

  getAll(): Receta[] {
    return this.recetas$.getValue();
  }

  findById(id: string): Receta | undefined {
    return this.getAll().find(r => r.id === id);
  }

  add(receta: Receta) {
    const recetas = [receta, ...this.getAll()];
    this.save(recetas);
  }

  update(updated: Receta) {
    const recetas = this.getAll().map(r => r.id === updated.id ? updated : r);
    this.save(recetas);
  }

  delete(id: string) {
    const recetas = this.getAll().filter(r => r.id !== id);
    this.save(recetas);
  }

  toggleFavorita(id: string) {
    const recetas = this.getAll().map(r => {
      if (r.id === id) r.favorita = !r.favorita;
      return r;
    });
    this.save(recetas);
  }

  // Ejemplos iniciales para que la app no arranque vacía
  private sampleData(): Receta[] {
    return [
      {
        id: this.uuid(),
        titulo: 'Tostadas con aguacate',
        descripcion: 'Rápido y delicioso',
        ingredientes: ['Pan', 'Aguacate', 'Sal', 'Pimienta', 'Limón'],
        pasos: ['Tostar el pan', 'Machacar el aguacate', 'Untar y sazonar'],
        favorita: false,
        createdAt: new Date().toISOString()
      },
      {
        id: this.uuid(),
        titulo: 'Ensalada mediterránea',
        descripcion: 'Fresca y saludable',
        ingredientes: ['Lechuga','Tomate','Pepino','Aceitunas','Queso feta'],
        pasos: ['Lavar y cortar las verduras','Mezclar todo','Aliñar al gusto'],
        favorita: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  // simple UUID (no crypto necesario aquí)
  private uuid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
}
