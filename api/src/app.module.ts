import { Module } from '@nestjs/common';
import { BatteryController } from './BatteryController';
import { BatteryService } from './services/BatteryService';
import { BatteryRepository } from './repositories/BatteryRepository';
import PrismaService from './prisma.service';

@Module({
  imports: [],
  controllers: [BatteryController],
  providers: [PrismaService, BatteryRepository, BatteryService],
})
export class AppModule {}
