import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Battery, BatteryStatus } from '@prisma/client';
import { BatteryRepository } from '../../repositories/BatteryRepository';

@Injectable()
export class BatteryService {
  constructor(private batteryRepository: BatteryRepository) {}

  public async findById(batteryId: number): Promise<Battery> {
    const battery = await this.batteryRepository.findById(batteryId);

    if (!battery) {
      throw new NotFoundException(`Battery with id ${batteryId} not found`);
    }

    return battery;
  }

  public async createBattery(name: string, capacity: number): Promise<Battery> {
    return this.batteryRepository.createBattery(name, capacity);
  }

  public async chargeBattery(
    batteryId: number,
    charge: number,
  ): Promise<Battery> {
    const battery = await this.findById(batteryId);

    const updatedCharge = battery.charge + charge;

    const update = {
      charge:
        updatedCharge >= battery.totalCapacity
          ? battery.totalCapacity
          : updatedCharge,
      status:
        updatedCharge >= battery.totalCapacity
          ? BatteryStatus.Full
          : BatteryStatus.Charged,
    };

    return this.batteryRepository.chargeBattery(batteryId, update);
  }

  public async dischargeBattery(
    batteryId: number,
    charge: number,
  ): Promise<Battery> {
    const battery = await this.findById(batteryId);

    if (charge > battery.charge) {
      throw new BadRequestException(
        `Cannot discharge more than the battery has ${batteryId}`,
      );
    }

    const doesEliminateCharge = battery.charge - charge === 0;
    const shouldDegradeBattery =
      doesEliminateCharge && battery.emptyCount + 1 === 3;

    const update = {
      emptyCount: doesEliminateCharge
        ? battery.emptyCount + 1
        : battery.emptyCount,
      status: doesEliminateCharge ? BatteryStatus.Empty : BatteryStatus.Charged,
      charge: battery.charge - charge,
      totalCapacity: shouldDegradeBattery
        ? battery.totalCapacity - battery.totalCapacity / 10
        : battery.totalCapacity,
    };

    return this.batteryRepository.dischargeBattery(batteryId, update);
  }
}
