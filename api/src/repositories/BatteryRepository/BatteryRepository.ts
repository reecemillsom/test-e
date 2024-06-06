import { Injectable } from '@nestjs/common';
import { Battery } from '@prisma/client';
import PrismaService from '../../prisma.service';

// TODO add return types.
@Injectable()
export class BatteryRepository {
  constructor(private prismaService: PrismaService) {
    console.log('prisma service>', prismaService);
  }

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

  public async chargeBattery(batteryId: number, charge: number): Promise<any> {
    return this.prismaService.battery.update({
      where: {
        id: batteryId,
      },
      data: {
        charge,
      },
    });
  }

  public async dischargeBattery(batteryId: number, charge: number) {
    return this.prismaService.battery.update({
      where: {
        id: batteryId,
      },
      data: {
        charge,
      },
    });
  }
}
