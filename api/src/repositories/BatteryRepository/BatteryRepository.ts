import { Injectable } from '@nestjs/common';
import { Battery, BatteryStatus } from '@prisma/client';
import PrismaService from '../../prisma.service';

@Injectable()
export class BatteryRepository {
  constructor(private prismaService: PrismaService) {}

  public async createBattery(
    name: string,
    totalCapacity: number,
  ): Promise<Battery> {
    return this.prismaService.battery.create({
      data: {
        name,
        totalCapacity,
        charge: totalCapacity,
      },
    });
  }

  public async chargeBattery(
    batteryId: number,
    update: { charge: number; status: BatteryStatus },
  ): Promise<Battery> {
    const { charge, status } = update;

    return this.prismaService.battery.update({
      where: {
        id: batteryId,
      },
      data: {
        charge,
        status,
      },
    });
  }

  public async dischargeBattery(
    batteryId: number,
    update: {
      charge: number;
      status: BatteryStatus;
      emptyCount: number;
      totalCapacity: number;
    },
  ): Promise<Battery> {
    const { charge, status, totalCapacity, emptyCount } = update;

    return this.prismaService.battery.update({
      where: {
        id: batteryId,
      },
      data: {
        charge,
        emptyCount,
        totalCapacity,
        status,
      },
    });
  }

  public async findById(batteryId: number): Promise<Battery | null> {
    return this.prismaService.battery.findUnique({
      where: {
        id: batteryId,
      },
    });
  }
}
