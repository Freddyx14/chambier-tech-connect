
export interface Trabajador {
  id: string;
  foto_perfil: string | null;
  nombre: string;
  apellido: string;
  profesiones: string[];
  descripcion: string | null;
  numero_celular: string | null;
  imagenes_trabajos: string[];
  promedio_estrellas: number;
  created_at: string;
  updated_at: string;
}

export interface Resena {
  id: string;
  id_trabajador: string;
  comentario: string;
  estrellas: number;
  fecha: string;
  nombre_cliente: string;
}

export interface TrabajadorConResenas extends Trabajador {
  resenas: Resena[];
}
