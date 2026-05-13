import { FastifyRequest, FastifyReply } from 'fastify';
import { ExposicionService } from '../services/exposicionesService';

export class ExposicionController {
  constructor(private exposicionService: ExposicionService) {}

  async listByEquipo(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as any;
    const equipoId = parseInt(query.equipoId);
    const page = parseInt(query.page || '0');
    const size = parseInt(query.size || '10');
    const result = await this.exposicionService.listByEquipo(equipoId, page, size);
    reply.send(result);
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    try {
      const exposicion = await this.exposicionService.getById(id);
      reply.send(exposicion);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as { titulo: string; fecha_exposicion: string; id_equipo: number; rubrica?: any };
    try {
      const nueva = await this.exposicionService.create(body);
      reply.status(201).send(nueva);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    const body = request.body as { titulo?: string; fecha_exposicion?: string; rubrica?: any };
    try {
      const updated = await this.exposicionService.update(id, body);
      reply.send(updated);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    try {
      await this.exposicionService.delete(id);
      reply.status(204).send();
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }
}