import { IsNumber, IsString } from "class-validator";

export class CreateParkingSpotDto {
    @IsNumber()
    parking_id: number;

    @IsString()
    parking_number: string;
}
