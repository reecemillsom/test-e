import {
  Body,
  Controller,
  Get,
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

  @Get('/:id/')
  getBattery(@Param('id') id: string): Promise<Battery> {
    return this.batteryService.findById(Number(id));
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  createBattery(@Body() body: CreateBatteryDTO): Promise<Battery> {
    return this.batteryService.createBattery(body.name, body.totalCapacity);
  }

  @Patch('/:id/charge')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  chargeBattery(
    @Param('id') id: string,
    @Body() body: ChargeBatteryDTO,
  ): Promise<Battery> {
    return this.batteryService.chargeBattery(Number(id), body.charge);
  }

  @Patch('/:id/discharge')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  dischargeBattery(@Param('id') id: string, @Body() body: DischargeBatteryDTO) {
    return this.batteryService.dischargeBattery(Number(id), body.discharge);
  }
}
