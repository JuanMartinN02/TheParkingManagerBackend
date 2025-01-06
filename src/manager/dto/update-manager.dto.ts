import { IsString, IsEmail } from "class-validator";

export class UpdateManagerDto {
    @IsString()
    first_name: string;
    
    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}