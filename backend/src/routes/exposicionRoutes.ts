import { FastifyInstance } from 'fastify';
import { ExposicionController } from '../controllers/exposicionController';
import { ExposicionService } from '../services/exposicionesService';
import { ExposicionRepository } from '../repositories/exposicionRepository';
import { authMiddleware } from '../middlewares/auth';
import { supabase } from '../config/supabase';

export async function exposicionRoutes(fastify: FastifyInstance) {
  const repository = new ExposicionRepository(supabase);
  const service = new ExposicionService(repository);
  const controller = new ExposicionController(service);

  fastify.get('/exposiciones', { preHandler: authMiddleware }, (req, rep) => controller.listByEquipo(req, rep));
  fastify.get('/exposiciones/:id', { preHandler: authMiddleware }, (req, rep) => controller.getById(req, rep));
  fastify.post('/exposiciones', { preHandler: authMiddleware }, (req, rep) => controller.create(req, rep));
  fastify.put('/exposiciones/:id', { preHandler: authMiddleware }, (req, rep) => controller.update(req, rep));
  fastify.delete('/exposiciones/:id', { preHandler: authMiddleware }, (req, rep) => controller.delete(req, rep));
}