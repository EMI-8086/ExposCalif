import { FastifyInstance } from 'fastify';
import { EvaluacionController } from '../controllers/evaluacionController';
import { EvaluacionService } from '../services/evaluacionService';
import { EvaluacionRepository } from '../repositories/evaluacionRepository';
import { ExposicionRepository } from '../repositories/exposicionRepository';
import { CriterioRepository } from '../repositories/criterioRepository';
import { AlumnoRepository } from '../repositories/alumnoRepository';
import { authMiddleware } from '../middlewares/auth';
import { supabase } from '../config/supabase';

export async function evaluacionRoutes(fastify: FastifyInstance) {
  const evaluacionRepo = new EvaluacionRepository(supabase);
  const exposicionRepo = new ExposicionRepository(supabase);
  const criterioRepo = new CriterioRepository(supabase);
  const alumnoRepo = new AlumnoRepository(supabase);

  const service = new EvaluacionService(evaluacionRepo, exposicionRepo, criterioRepo, alumnoRepo);
  const controller = new EvaluacionController(service, alumnoRepo);

  fastify.post('/evaluaciones', { preHandler: authMiddleware }, (req, rep) => controller.registrar(req, rep));
  fastify.get('/exposiciones/:idExposicion/evaluaciones', { preHandler: authMiddleware }, (req, rep) => controller.listByExposicion(req, rep));
  fastify.get('/exposiciones/:idExposicion/mi-evaluacion', { preHandler: authMiddleware }, (req, rep) => controller.obtenerEvaluacionPropia(req, rep));
}