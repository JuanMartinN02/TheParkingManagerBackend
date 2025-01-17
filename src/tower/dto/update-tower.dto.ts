import { IsString, IsEmail, IsNumber } from "class-validator";

export class UpdateTowerDto {
    @IsNumber()
    tower_id: number;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
