import { FastifyRequest, FastifyReply } from 'fastify';
import { SupabaseClient } from '@supabase/supabase-js';
import { MateriaRepository } from '../repositories/materiaRepository';
import { MateriaService } from '../services/materiaService';

export class MateriaController {
  async list(supabaseClient: SupabaseClient, request: FastifyRequest, reply: FastifyReply) {
    const repository = new MateriaRepository(supabaseClient);
    const service = new MateriaService(repository);
    const query = request.query as any;
    const page = parseInt(query.page || '0');
    const size = parseInt(query.size || '10');
    const nombre = query.nombre;
    const result = await service.list(page, size, nombre);
    reply.send(result);
  }

  async getById(supabaseClient: SupabaseClient, request: FastifyRequest, reply: FastifyReply) {
    const repository = new MateriaRepository(supabaseClient);
    const service = new MateriaService(repository);
    const params = request.params as any;
    const id = Number(params.id);
    try {
      const materia = await service.getById(id);
      reply.send(materia);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async create(supabaseClient: SupabaseClient, request: FastifyRequest, reply: FastifyReply) {
    const repository = new MateriaRepository(supabaseClient);
    const service = new MateriaService(repository);
    const body = request.body as { clave_materia: string; nombre_materia: string };
    try {
      const nueva = await service.create(body);
      reply.status(201).send(nueva);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async update(supabaseClient: SupabaseClient, request: FastifyRequest, reply: FastifyReply) {
    const repository = new MateriaRepository(supabaseClient);
    const service = new MateriaService(repository);
    const params = request.params as any;
    const id = Number(params.id);
    const body = request.body as { clave_materia?: string; nombre_materia?: string };
    try {
      const updated = await service.update(id, body);
      reply.send(updated);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async delete(supabaseClient: SupabaseClient, request: FastifyRequest, reply: FastifyReply) {
    const repository = new MateriaRepository(supabaseClient);
    const service = new MateriaService(repository);
    const params = request.params as any;
    const id = Number(params.id);
    try {
      await service.delete(id);
      reply.status(204).send();
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }
}