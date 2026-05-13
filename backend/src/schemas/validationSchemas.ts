import { z } from 'zod';

export const materiaInputSchema = z.object({
  clave_materia: z.string().min(1),
  nombre_materia: z.string().min(1),
});

export const evaluacionInputSchema = z.object({
  id_exposicion: z.number().int().positive(),
  id_alumno_evaluador: z.number().int().positive(),
  detalles: z.array(z.object({
    id_criterio: z.number().int().positive(),
    calificacion: z.number().min(0).max(10),
  })),
  comentario_general: z.string().optional(),
});

export type MateriaInput = z.infer<typeof materiaInputSchema>;
export type EvaluacionInput = z.infer<typeof evaluacionInputSchema>;