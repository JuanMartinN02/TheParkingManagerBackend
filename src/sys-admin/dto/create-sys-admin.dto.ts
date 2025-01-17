import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateSysAdminDto {
    @IsNumber()
    sysAdmin_id: number;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
