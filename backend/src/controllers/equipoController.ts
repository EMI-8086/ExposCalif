import { FastifyRequest, FastifyReply } from 'fastify';
import { EquipoService } from '../services/equipoService';

export class EquipoController {
  constructor(private equipoService: EquipoService) {}

  async listByGrupo(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as any;
    const grupoId = parseInt(query.grupoId);
    const page = parseInt(query.page || '0');
    const size = parseInt(query.size || '10');
    const result = await this.equipoService.listByGrupo(grupoId, page, size);
    reply.send(result);
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    try {
      const equipo = await this.equipoService.getById(id);
      reply.send(equipo);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as { nombre_equipo: string; id_grupo: number };
    try {
      const nuevo = await this.equipoService.create(body);
      reply.status(201).send(nuevo);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    const body = request.body as { nombre_equipo?: string };
    try {
      const updated = await this.equipoService.update(id, body);
      reply.send(updated);
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const id = Number(params.id);
    try {
      await this.equipoService.delete(id);
      reply.status(204).send();
    } catch (error: any) {
      reply.status(404).send({ error: error.message });
    }
  }

  async addAlumno(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const equipoId = Number(params.equipoId);
    const body = request.body as { id_alumno: number };
    try {
      await this.equipoService.addAlumno(equipoId, body.id_alumno);
      reply.status(204).send();
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async removeAlumno(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any;
    const equipoId = Number(params.equipoId);
    const alumnoId = Number(params.alumnoId);
    try {
      await this.equipoService.removeAlumno(equipoId, alumnoId);
      reply.status(204).send();
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }
}