import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreatePropertyDto {
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

  @IsOptional() // Map is optional
  @IsString()
  map?: string;
}
