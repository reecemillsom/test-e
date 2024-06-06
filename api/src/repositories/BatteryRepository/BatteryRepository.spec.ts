import { Test } from '@nestjs/testing';
import PrismaService from '../../prisma.service';
import { BatteryRepository } from './BatteryRepository';
import { Battery, BatteryStatus } from '@prisma/client';

describe('BatteryRepository', () => {
  let prismaService: PrismaService;
  let batteryRepository: BatteryRepository;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, BatteryRepository],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    batteryRepository = moduleRef.get<BatteryRepository>(BatteryRepository);
  });

  it('should define the repo and its dependencies', () => {
    expect(prismaService).toBeDefined();
    expect(batteryRepository).toBeDefined();
  });

  describe('when asked to create a battery', () => {
    describe('given a name and capacity', () => {
      let mockData: Battery;
      beforeAll(() => {
        mockData = {
          id: 123,
          name: 'New Battery',
          totalCapacity: 4,
          charge: 4,
          emptyCount: 0,
          status: BatteryStatus.Full,
        };
      });

      it('should call the database query with the correct values', async () => {
        const createSpy = jest
          .spyOn(prismaService.battery, 'create')
          .mockResolvedValue(mockData);

        await batteryRepository.createBattery('New Battery', 4);

        expect(createSpy).toHaveBeenCalledWith({
          data: {
            name: 'New Battery',
            totalCapacity: 4,
            charge: 4,
          },
        });
      });
    });
  });

  describe('when asked to charge a battery', () => {
    describe('given the id and the amount to charge', () => {
      let mockData: Battery;
      beforeAll(() => {
        mockData = {
          id: 1234,
          name: 'New Battery',
          totalCapacity: 4,
          charge: 2,
          emptyCount: 0,
          status: BatteryStatus.Full,
        };
      });

      it('should call the database query with the correct values', async () => {
        const updateSpy = jest
          .spyOn(prismaService.battery, 'update')
          .mockResolvedValue(mockData);

        await batteryRepository.chargeBattery(1234, {
          charge: 4,
          status: BatteryStatus.Full,
        });

        expect(updateSpy).toHaveBeenCalledWith({
          where: {
            id: 1234,
          },
          data: {
            charge: 4,
            status: BatteryStatus.Full,
          },
        });
      });
    });
  });

  describe('when asked to discharge a battery', () => {
    describe('given the id and amount to discharge', () => {
      let mockData: Battery;
      beforeAll(() => {
        mockData = {
          id: 1234,
          name: 'New Battery',
          totalCapacity: 4,
          charge: 2,
          emptyCount: 0,
          status: BatteryStatus.Full,
        };
      });

      it('should call the database query with the correct values', async () => {
        const updateSpy = jest
          .spyOn(prismaService.battery, 'update')
          .mockResolvedValue(mockData);

        await batteryRepository.dischargeBattery(1234, {
          charge: 2,
          emptyCount: 0,
          totalCapacity: 4,
          status: BatteryStatus.Charged,
        });

        expect(updateSpy).toHaveBeenCalledWith({
          where: {
            id: 1234,
          },
          data: {
            charge: 2,
            emptyCount: 0,
            totalCapacity: 4,
            status: BatteryStatus.Charged,
          },
        });
      });
    });
  });

  describe('when asked to find a battery', () => {
    let mockData: Battery;

    beforeAll(() => {
      mockData = {
        id: 1234,
        name: 'New Battery',
        totalCapacity: 4,
        charge: 2,
        emptyCount: 0,
        status: BatteryStatus.Full,
      };
    });

    it('should call the database with a battery id value', async () => {
      jest
        .spyOn(prismaService.battery, 'findUnique')
        .mockResolvedValue(mockData);

      const result = await batteryRepository.findById(mockData.id);

      expect(result).toEqual(mockData);
    });
  });
});
