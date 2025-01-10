import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingSpotDto } from './create-parking-spot.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateParkingSpotDto extends PartialType(CreateParkingSpotDto) {
    @IsNumber()
    parking_id: number;

    @IsString()
    parking_number: string;
}
