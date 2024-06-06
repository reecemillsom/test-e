import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { Battery } from '@prisma/client';
import { ChargeBatteryDTO, CreateBatteryDTO, DischargeBatteryDTO } from 'lib';
import { BatteryService } from './services/BatteryService';

// TODO body types, will likely need to extend the interfaces so we can use validation pipes on them.
@Controller('batteries')
export class BatteryController {
  constructor(private readonly batteryService: BatteryService) {}

  @Post()
  createBattery(@Body() body: CreateBatteryDTO): Promise<Battery> {
    return this.batteryService.createBattery(body.name, body.totalCapacity);
  }

  @Patch('/:id/charge')
  chargeBattery(
    @Param('id') id: number,
    @Body() body: ChargeBatteryDTO,
  ): Promise<Battery> {
    return this.batteryService.chargeBattery(id, body.charge);
  }

  @Patch('/:id/discharge')
  dischargeBattery(@Param('id') id: number, @Body() body: DischargeBatteryDTO) {
    return this.batteryService.dischargeBattery(id, body.discharge);
  }
}
