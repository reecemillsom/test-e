import { IsNumber, IsString } from 'class-validator';
import { CreateBatteryDTO as DTO } from 'lib';

export class CreateBatteryDTO implements DTO {
  @IsString()
  name: string;

  @IsNumber()
  totalCapacity: number = 4;
}
