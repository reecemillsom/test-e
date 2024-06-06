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

  public async createBattery(name: string, capacity: number): Promise<Battery> {
    return this.batteryRepository.createBattery(name, capacity);
  }

  public async chargeBattery(
    batteryId: number,
    charge: number,
  ): Promise<Battery> {
    const battery = await this.batteryRepository.findById(batteryId);

    if (!battery) {
      throw new NotFoundException(`Battery with id ${batteryId} not found`);
    }

    const updatedCharge = battery.charge + charge;

    return this.batteryRepository.chargeBattery(
      batteryId,
      updatedCharge > battery.totalCapacity
        ? battery.totalCapacity
        : updatedCharge,
    );
  }

  public async dischargeBattery(
    batteryId: number,
    charge: number,
  ): Promise<Battery> {
    const battery = await this.batteryRepository.findById(batteryId);

    if (!battery) {
      throw new NotFoundException(`Battery with id ${batteryId} not found`);
    }

    if (charge > battery.charge) {
      throw new BadRequestException(
        `Cannot discharge more than the battery has ${batteryId}`,
      );
    }

    const doesEliminateCharge = battery.charge - charge === 0;

    const update = {
      emptyCount: doesEliminateCharge
        ? battery.emptyCount + 1
        : battery.emptyCount,
      status: doesEliminateCharge ? BatteryStatus.Empty : BatteryStatus.Charged,
      charge: battery.charge - charge,
    };

    return this.batteryRepository.dischargeBattery(batteryId, update);
  }
}
