import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Battery } from '@prisma/client';
import { CreateBatteryDTO, ChargeBatteryDTO, DischargeBatteryDTO } from './DTO';
import { BatteryService } from './services/BatteryService';

@Controller('batteries')
export class BatteryController {
  constructor(private readonly batteryService: BatteryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  createBattery(@Body() body: CreateBatteryDTO): Promise<Battery> {
    return this.batteryService.createBattery(body.name, body.totalCapacity);
  }

  @Patch('/:id/charge')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  chargeBattery(
    @Param('id') id: number,
    @Body() body: ChargeBatteryDTO,
  ): Promise<Battery> {
    return this.batteryService.chargeBattery(id, body.charge);
  }

  @Patch('/:id/discharge')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  dischargeBattery(@Param('id') id: number, @Body() body: DischargeBatteryDTO) {
    return this.batteryService.dischargeBattery(id, body.discharge);
  }
}
