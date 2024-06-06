import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ChargeBatteryDTO, CreateBatteryDTO, DischargeBatteryDTO } from 'lib';
import { AppService } from './app.service';

// TODO add return types.
@Controller('batteries')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createBattery(@Body() body: CreateBatteryDTO)  {}

  @Patch('/:id/charge')
  chargeBattery(@Param('id') id: number, @Body() body: ChargeBatteryDTO) {}

  @Patch('/:id/discharge')
  dischargeBattery(@Param('id') id: number, @Body() body: DischargeBatteryDTO) {}
}
