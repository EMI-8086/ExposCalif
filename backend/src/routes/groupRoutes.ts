import { FastifyInstance } from 'fastify';
import { GrupoController } from '../controllers/grupoController';
import { GrupoService } from '../services/grupoService';
import { GrupoRepository } from '../repositories/grupoRepository';
import { authMiddleware } from '../middlewares/auth';
import { supabase } from '../config/supabase';

export async function grupoRoutes(fastify: FastifyInstance) {
  const repository = new GrupoRepository(supabase);
  const service = new GrupoService(repository);
  const controller = new GrupoController(service);

  fastify.get('/grupos', { preHandler: authMiddleware }, (req, rep) => controller.listByMateria(req, rep));
  fastify.get('/grupos/:id', { preHandler: authMiddleware }, (req, rep) => controller.getById(req, rep));
  fastify.post('/grupos', { preHandler: authMiddleware }, (req, rep) => controller.create(req, rep));
  fastify.put('/grupos/:id', { preHandler: authMiddleware }, (req, rep) => controller.update(req, rep));
  fastify.delete('/grupos/:id', { preHandler: authMiddleware }, (req, rep) => controller.delete(req, rep));
}