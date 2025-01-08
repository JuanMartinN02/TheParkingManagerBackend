import { IsEmail, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class CreateResidentDto {

    @IsNumber()
    resident_id: number;

    @IsString()
    apt_number: string;
    
    @IsString()
    first_name: string;
    
    @IsString()
    last_name: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;

    @IsNumber()
    vehicles_allowed: number;

    @IsNumber()
    visitors_allowed: number;
}
