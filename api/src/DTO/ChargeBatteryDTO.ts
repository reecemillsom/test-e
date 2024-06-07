import { IsNumber } from 'class-validator';
import { ChargeBatteryDTO as DTO } from 'lib';

export class ChargeBatteryDTO implements DTO {
  @IsNumber()
  charge: number;
}
