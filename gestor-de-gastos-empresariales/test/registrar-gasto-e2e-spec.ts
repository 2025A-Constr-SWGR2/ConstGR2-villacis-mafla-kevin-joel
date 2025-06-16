import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Gastos (e2e)', () => {
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

  it('POST /gastos debe registrar un nuevo gasto', async () => {
    const nuevoGasto = {
      descripcion: 'Almuerzo',
      monto: 12.5,
      categoria: 'Comida',
      fecha: '2025-06-16'
    };
    const res = await request(app.getHttpServer())
      .post('/gastos')
      .send(nuevoGasto);
    expect(res.status).toBe(201); // o 200 según tu implementación
    expect(res.body).toMatchObject(nuevoGasto);
  });
});