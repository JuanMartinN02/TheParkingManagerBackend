import { PartialType } from '@nestjs/mapped-types';
import { CreateResidentDto } from './create-resident.dto';
import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

export class UpdateResidentDto extends PartialType(CreateResidentDto) {
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

    @IsDate()
    creation_date: Date;

    @IsNumber()
    visitors_allowed: number;
}
