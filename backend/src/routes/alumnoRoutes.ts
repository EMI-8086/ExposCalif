import { FastifyInstance } from 'fastify';
import { AlumnoController } from '../controllers/alumnoController';
import { AlumnoService } from '../services/alumnoService';
import { AlumnoRepository } from '../repositories/alumnoRepository';
import { authMiddleware } from '../middlewares/auth';
import { supabase } from '../config/supabase';

export async function alumnoRoutes(fastify: FastifyInstance) {
  const repository = new AlumnoRepository(supabase);
  const service = new AlumnoService(repository);
  const controller = new AlumnoController(service);

  fastify.get('/alumnos', { preHandler: authMiddleware }, (req, rep) => controller.listAll(req, rep));
  fastify.get('/alumnos/perfil', { preHandler: authMiddleware }, (req, rep) => controller.getPerfil(req, rep));
  fastify.get('/alumnos/:id', { preHandler: authMiddleware }, (req, rep) => controller.getById(req, rep));
  fastify.post('/alumnos', { preHandler: authMiddleware }, (req, rep) => controller.create(req, rep));
  fastify.put('/alumnos/:id', { preHandler: authMiddleware }, (req, rep) => controller.update(req, rep));
  fastify.delete('/alumnos/:id', { preHandler: authMiddleware }, (req, rep) => controller.delete(req, rep));
}