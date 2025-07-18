import { IsEnum, IsString } from "class-validator";
import { Category } from "src/bus/enums/bus.enum";

export class RideSearchDto{
    @IsString()
     pickup_location: string;

    @IsString()
    dropoff_location: string;

    @IsString()
    ride_Date: string;

    @IsString()
    departure_time: string;

    @IsEnum(Category)
    category: string;
}