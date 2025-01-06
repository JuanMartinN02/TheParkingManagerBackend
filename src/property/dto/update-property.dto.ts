import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdatePropertyDto {
    @IsString()
    name: string;
  
    @IsInt()
    @Min(0) // Ensure the number is not negative
    reserved_parking_quantity: number;
  
    @IsInt()
    @Min(0)
    visitors_quantity: number;
  
    @IsInt()
    @Min(0)
    hours_per_visitor: number;
  
    @IsString()
    map: string;
  }
