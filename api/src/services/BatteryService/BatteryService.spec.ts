import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Battery, BatteryStatus } from '@prisma/client';
import PrismaService from '../../prisma.service';
import { BatteryRepository } from '../../repositories/BatteryRepository';
import { BatteryService } from './BatteryService';

describe('BatteryService', () => {
  let batteryRepo: BatteryRepository;
  let batteryService: BatteryService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, BatteryRepository, BatteryService],
    }).compile();

    batteryRepo = moduleRef.get<BatteryRepository>(BatteryRepository);
    batteryService = moduleRef.get<BatteryService>(BatteryService);
  });

  describe('when asked to create a battery', () => {
    let mockData: Battery;
    beforeAll(() => {
      mockData = {
        id: 1212,
        name: 'New Battery',
        totalCapacity: 8,
        charge: 8,
        status: BatteryStatus.Full,
        emptyCount: 0,
      };
    });

    it('should call the repo with a name & capacity', async () => {
      jest.spyOn(batteryRepo, 'createBattery').mockResolvedValue(mockData);

      const result = await batteryService.createBattery('New Battery', 8);

      expect(result).toEqual(mockData);
    });
  });

  describe('when asked to charge a battery', () => {
    describe('when battery is not found', () => {
      beforeAll(() => {
        jest.spyOn(batteryRepo, 'findById').mockResolvedValue(null);
      });

      it('should throw a not found error', async () => {
        await expect(batteryService.chargeBattery(123, 2)).rejects.toThrow(
          NotFoundException,
        );
      });
    });

    describe('when battery is found', () => {
      describe('when charge is more than the capacity', () => {
        let mockData: Battery;

        beforeAll(() => {
          mockData = {
            id: 1212,
            name: 'Existing Battery',
            totalCapacity: 4,
            charge: 2,
            status: BatteryStatus.Charged,
            emptyCount: 0,
          };

          jest.spyOn(batteryRepo, 'findById').mockResolvedValue(mockData);
          jest.spyOn(batteryRepo, 'chargeBattery').mockResolvedValue({
            ...mockData,
            charge: 4,
          });
        });

        it('should call the repo with the id and the charge', async () => {
          const result = await batteryService.chargeBattery(1212, 10);

          expect(batteryRepo.chargeBattery).toHaveBeenCalledWith(1212, 4);

          expect(result).toEqual({ ...mockData, charge: 4 });
        });
      });

      describe('when charge is less than the capacity', () => {
        let mockData: Battery;

        beforeAll(() => {
          mockData = {
            id: 1212,
            name: 'Existing Battery',
            totalCapacity: 4,
            charge: 2,
            status: BatteryStatus.Charged,
            emptyCount: 0,
          };

          jest.spyOn(batteryRepo, 'findById').mockResolvedValue(mockData);
          jest.spyOn(batteryRepo, 'chargeBattery').mockResolvedValue({
            ...mockData,
            charge: 3,
          });
        });

        it('should call the repo with the id and charge', async () => {
          const result = await batteryService.chargeBattery(1212, 1);

          expect(batteryRepo.chargeBattery).toHaveBeenCalledWith(1212, 3);

          expect(result).toEqual({ ...mockData, charge: 3 });
        });
      });
    });
  });

  describe('when asked to discharge a battery', () => {
    describe('when a battery is not found', () => {
      beforeAll(() => {
        jest.spyOn(batteryRepo, 'findById').mockResolvedValue(null);
      });

      it('should throw a not found error', async () => {
        await expect(batteryService.dischargeBattery(121, 2)).rejects.toThrow(
          NotFoundException,
        );
      });
    });

    describe('when a battery is found', () => {
      describe('when the discharge is more than its current charge', () => {
        beforeAll(() => {
          jest.spyOn(batteryRepo, 'findById').mockResolvedValue({
            id: 1212,
            name: 'Existing Battery',
            totalCapacity: 4,
            charge: 2,
            status: BatteryStatus.Charged,
            emptyCount: 0,
          });
        });

        it('should throw a bad request error', async () => {
          await expect(
            batteryService.dischargeBattery(1212, 3),
          ).rejects.toThrow(BadRequestException);
        });
      });

      describe('when the battery discharges to empty', () => {
        let mockData: Battery;
        let resultMock: Battery;
        beforeAll(() => {
          mockData = {
            id: 1212,
            name: 'Existing Battery',
            totalCapacity: 4,
            charge: 2,
            status: BatteryStatus.Charged,
            emptyCount: 1,
          };

          resultMock = {
            ...mockData,
            emptyCount: 2,
            charge: 0,
            status: BatteryStatus.Empty,
          };

          jest.spyOn(batteryRepo, 'findById').mockResolvedValue(mockData);

          jest
            .spyOn(batteryRepo, 'dischargeBattery')
            .mockResolvedValue(resultMock);
        });

        it('should set the update accordingly', async () => {
          const result = await batteryService.dischargeBattery(1234, 2);

          expect(batteryRepo.dischargeBattery).toHaveBeenCalledWith(1234, {
            emptyCount: 2,
            status: BatteryStatus.Empty,
            charge: 0,
          });

          expect(result).toEqual(resultMock);
        });
      });

      describe('when battery discharge is not empty', () => {
        let mockData: Battery;
        let resultMock: Battery;
        beforeAll(() => {
          mockData = {
            id: 1212,
            name: 'Existing Battery',
            totalCapacity: 4,
            charge: 2,
            status: BatteryStatus.Charged,
            emptyCount: 1,
          };

          resultMock = {
            ...mockData,
            charge: 0,
            status: BatteryStatus.Empty,
          };

          jest.spyOn(batteryRepo, 'findById').mockResolvedValue(mockData);

          jest
            .spyOn(batteryRepo, 'dischargeBattery')
            .mockResolvedValue(resultMock);
        });

        it('should set the update accordingly', async () => {
          const result = await batteryService.dischargeBattery(1234, 1);

          expect(batteryRepo.dischargeBattery).toHaveBeenCalledWith(1234, {
            emptyCount: 1,
            status: BatteryStatus.Charged,
            charge: 1,
          });

          expect(result).toEqual(resultMock);
        });
      });
    });
  });
});
