import { FastifyInstance } from 'fastify';
import { EquipoController } from '../controllers/equipoController';
import { EquipoService } from '../services/equipoService';
import { EquipoRepository } from '../repositories/equipoRepository';
import { authMiddleware } from '../middlewares/auth';
import { supabase } from '../config/supabase';

export async function equipoRoutes(fastify: FastifyInstance) {
  const repository = new EquipoRepository(supabase);
  const service = new EquipoService(repository);
  const controller = new EquipoController(service);

  fastify.get('/equipos', { preHandler: authMiddleware }, (req, rep) => controller.listByGrupo(req, rep));
  fastify.get('/equipos/:id', { preHandler: authMiddleware }, (req, rep) => controller.getById(req, rep));
  fastify.post('/equipos', { preHandler: authMiddleware }, (req, rep) => controller.create(req, rep));
  fastify.put('/equipos/:id', { preHandler: authMiddleware }, (req, rep) => controller.update(req, rep));
  fastify.delete('/equipos/:id', { preHandler: authMiddleware }, (req, rep) => controller.delete(req, rep));
  fastify.post('/equipos/:equipoId/alumnos', { preHandler: authMiddleware }, (req, rep) => controller.addAlumno(req, rep));
  fastify.delete('/equipos/:equipoId/alumnos/:alumnoId', { preHandler: authMiddleware }, (req, rep) => controller.removeAlumno(req, rep));
}