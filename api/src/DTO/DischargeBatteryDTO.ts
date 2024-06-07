import { IsNumber } from 'class-validator';
import { DischargeBatteryDTO as DTO } from 'lib';

export class DischargeBatteryDTO implements DTO {
  @IsNumber()
  discharge: number;
}
