import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Eliminar gasto (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('DELETE /gastos/:id debe eliminar un gasto existente', async () => {
    // Primero, crea un gasto
    const nuevoGasto = {
      descripcion: 'Taxi',
      monto: 8,
      categoria: 'Transporte',
      fecha: '2025-06-16'
    };
    const crearRes = await request(app.getHttpServer())
      .post('/gastos')
      .send(nuevoGasto);

    const id = crearRes.body.id; // Ajusta según cómo devuelvas el ID

    // Ahora, elimina el gasto
    const eliminarRes = await request(app.getHttpServer())
      .delete(`/gastos/${id}`);

    expect(eliminarRes.status).toBe(200); // o 204 según tu implementación
    // Puedes agregar más validaciones si tu API devuelve algún mensaje o body
  });
});