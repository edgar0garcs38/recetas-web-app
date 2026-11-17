export interface Receta {
  id: string;             // uuid / string
  titulo: string;
  descripcion?: string;
  ingredientes: string[]; // lista de strings
  pasos: string[];        // lista de pasos
  favorita: boolean;
  createdAt: string;      // ISO date
}
