import { FastifyRequest, FastifyReply } from 'fastify';
import { AlumnoService } from '../services/alumnoService';

export class AlumnoController {
  constructor(private alumnoService: AlumnoService) {}

  async listAll(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as any;
    const page = parseInt(query.page || '0');
    const size = parseInt(query.size || '10');
    const search = query.search;
    const result = await this.alumnoService.listAll(page, size, search);
    reply.send(result);
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    const currentUserId = (request as any).user?.id;
    const currentUserRol = (request as any).user?.rol;
    try {
      const alumno = await this.alumnoService.getById(id, currentUserId, currentUserRol);
      reply.send(alumno);
    } catch (error: any) {
      reply.status(403).send({ error: error.message });
    }
  }

  async getPerfil(request: FastifyRequest, reply: FastifyReply) {
    const usuarioId = (request as any).user?.id;
    if (!usuarioId) {
      return reply.status(401).send({ error: 'Usuario no autenticado' });
    }
    try {
      const perfil = await this.alumnoService.getPerfil(usuarioId);
      reply.send(perfil);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as { matricula: string; nombre: string; apellido: string; email: string; id_usuario?: string };
    try {
      const nuevo = await this.alumnoService.create(body);
      reply.status(201).send(nuevo);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    const body = request.body as { matricula?: string; nombre?: string; apellido?: string; email?: string };
    const currentUserId = (request as any).user?.id;
    const currentUserRol = (request as any).user?.rol;
    try {
      const updated = await this.alumnoService.update(id, body, currentUserId, currentUserRol);
      reply.send(updated);
    } catch (error: any) {
      reply.status(error.message.includes('permiso') ? 403 : 404).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    try {
      await this.alumnoService.delete(id);
      reply.status(204).send();
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }
}