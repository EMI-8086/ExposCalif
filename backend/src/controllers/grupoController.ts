import { FastifyRequest, FastifyReply } from 'fastify';
import { GrupoService } from '../services/grupoService';

export class GrupoController {
  constructor(private grupoService: GrupoService) {}

  async listByMateria(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as any;
    const materiaId = parseInt(query.materiaId);
    const page = parseInt(query.page || '0');
    const size = parseInt(query.size || '10');
    const result = await this.grupoService.listByMateria(materiaId, page, size);
    reply.send(result);
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    try {
      const grupo = await this.grupoService.getById(id);
      reply.send(grupo);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as { nombre_grupo: string; periodo: string; id_materia: number };
    try {
      const nuevo = await this.grupoService.create(body);
      reply.status(201).send(nuevo);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    const body = request.body as { nombre_grupo?: string; periodo?: string; id_materia?: number };
    try {
      const updated = await this.grupoService.update(id, body);
      reply.send(updated);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    try {
      await this.grupoService.delete(id);
      reply.status(204).send();
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }
}