import { FastifyInstance } from 'fastify';
import { MateriaController } from '../controllers/materiaController';
import { MateriaService } from '../services/materiaService';
import { MateriaRepository } from '../repositories/materiaRepository';
import { authMiddleware } from '../middlewares/auth';
import { supabase } from '../config/supabase';

export async function materiaRoutes(fastify: FastifyInstance) {
  const repository = new MateriaRepository(supabase);
  const service = new MateriaService(repository);
  const controller = new MateriaController(service);

  fastify.get('/materias', { preHandler: authMiddleware }, (req, rep) => controller.list(req, rep));
  fastify.get('/materias/:id', { preHandler: authMiddleware }, (req, rep) => controller.getById(req, rep));
  fastify.post('/materias', { preHandler: authMiddleware }, (req, rep) => controller.create(req, rep));
  fastify.put('/materias/:id', { preHandler: authMiddleware }, (req, rep) => controller.update(req, rep));
  fastify.delete('/materias/:id', { preHandler: authMiddleware }, (req, rep) => controller.delete(req, rep));
}