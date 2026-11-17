import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../models/receta.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-receta',
  standalone: true,   // ✅ ahora es standalone
  imports: [
    CommonModule,        // ✅ para *ngIf, *ngFor, pipes
    ReactiveFormsModule, // ✅ para formGroup, formControlName, formArrayName
    RouterModule         // ✅ para routerLink, navegación
  ],
  templateUrl: './form-receta.component.html',
  styleUrls: ['./form-receta.component.scss']
})
export class FormRecetaComponent implements OnInit {
  form!: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private rs: RecetaService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      titulo: ['', Validators.required],
      descripcion: [''],
      ingredientes: this.fb.array<string>([]),
      pasos: this.fb.array<string>([]),
      favorita: [false]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const receta = this.rs.findById(id);
      if (receta) {
        this.editMode = true;
        this.form.patchValue({
          id: receta.id,
          titulo: receta.titulo,
          descripcion: receta.descripcion,
          favorita: receta.favorita
        });
        receta.ingredientes.forEach(i => this.ingredientes.push(this.fb.control(i)));
        receta.pasos.forEach(p => this.pasos.push(this.fb.control(p)));
      }
    } else {
      this.addIngrediente();
      this.addPaso();
    }
  }

  get ingredientes() { return this.form.get('ingredientes') as FormArray; }
  get pasos() { return this.form.get('pasos') as FormArray; }

  addIngrediente() { this.ingredientes.push(this.fb.control('')); }
  removeIngrediente(i: number) { this.ingredientes.removeAt(i); }

  addPaso() { this.pasos.push(this.fb.control('')); }
  removePaso(i: number) { this.pasos.removeAt(i); }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.value as any;

    const receta: Receta = {
      id: value.id || this.uuid(),
      titulo: value.titulo ?? '',
      descripcion: value.descripcion ?? '',
      ingredientes: (value.ingredientes ?? []).filter((x: string | null) => !!x && x.toString().trim() !== '') as string[],
      pasos: (value.pasos ?? []).filter((x: string | null) => !!x && x.toString().trim() !== '') as string[],
      favorita: !!value.favorita,
      createdAt: new Date().toISOString()
    };

    if (this.editMode) {
      this.rs.update(receta);
    } else {
      this.rs.add(receta);
    }
    this.router.navigate(['/']);
  }

  private uuid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
}
