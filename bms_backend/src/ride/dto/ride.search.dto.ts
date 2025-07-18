import { IsEnum, IsString } from "class-validator";
import { Category } from "src/bus/enums/bus.enum";

export class RideSearchDto{
    @IsString()
     source: string;

    @IsString()
    destination: string;

    @IsString()
    ride_Date: string;

    @IsString()
    departure_time: string;

    @IsEnum(Category)
    category: string;
}