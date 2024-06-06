import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Battery, BatteryStatus } from '@prisma/client';
import { AppModule } from './app.module';
import PrismaService from './prisma.service';
import { INestApplication } from '@nestjs/common';
import * as module from 'node:module';

describe('BatteryController', () => {
  describe('POST /batteries', () => {
    let battery: Battery;
    let app: INestApplication;

    beforeAll(async () => {
      battery = {
        id: 1,
        name: 'New Battery',
        totalCapacity: 8,
        charge: 8,
        emptyCount: 0,
        status: BatteryStatus.Full,
      };

      const prismaService = {
        battery: {
          create: jest.fn().mockResolvedValue(battery),
        },
      };

      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(PrismaService)
        .useValue(prismaService)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('should return the created battery', async () => {
      return request(app.getHttpServer())
        .post('/batteries')
        .expect(201)
        .expect(battery);
    });
  });

  describe('PATCH /:id/charge', () => {
    let battery: Battery;
    let app: INestApplication;

    beforeAll(async () => {
      battery = {
        id: 2,
        name: 'Existing Battery',
        totalCapacity: 8,
        charge: 6,
        emptyCount: 0,
        status: BatteryStatus.Charged,
      };

      const prismaService = {
        battery: {
          findUnique: jest.fn().mockResolvedValue({ ...battery, charge: 4 }),
          update: jest.fn().mockResolvedValue(battery),
        },
      };

      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(PrismaService)
        .useValue(prismaService)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('should return the charged battery', async () => {
      return request(app.getHttpServer())
        .patch(`/batteries/${battery.id}/charge`)
        .send({ charge: 2 })
        .expect(200)
        .expect(battery);
    });
  });

  describe('PATCH /:id/discharge', () => {
    let battery: Battery;
    let app: INestApplication;

    beforeAll(async () => {
      battery = {
        id: 2,
        name: 'Existing Battery',
        totalCapacity: 8,
        charge: 4,
        emptyCount: 0,
        status: BatteryStatus.Charged,
      };

      const prismaService = {
        battery: {
          findUnique: jest.fn().mockResolvedValue({ ...battery, charge: 6 }),
          update: jest.fn().mockResolvedValue(battery),
        },
      };

      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(PrismaService)
        .useValue(prismaService)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('should return the discharged battery', async () => {
      return request(app.getHttpServer())
        .patch(`/batteries/${battery.id}/discharge`)
        .send({ discharge: 2 })
        .expect(200)
        .expect(battery);
    });
  });
});
