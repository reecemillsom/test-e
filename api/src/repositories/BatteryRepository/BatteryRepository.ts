import { Injectable } from '@nestjs/common';
import { Battery } from '@prisma/client';
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
    charge: number,
  ): Promise<Battery> {
    return this.prismaService.battery.update({
      where: {
        id: batteryId,
      },
      data: {
        charge,
      },
    });
  }

  public async dischargeBattery(
    batteryId: number,
    update: { charge: number; emptyCount?: number; totalCapacity?: number },
  ): Promise<Battery> {
    const { charge, totalCapacity, emptyCount } = update;

    return this.prismaService.battery.update({
      where: {
        id: batteryId,
      },
      data: {
        charge,
        emptyCount,
        totalCapacity,
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
