import { IsInt, IsString } from "class-validator";

export class CreateRideDto {
    @IsString()
    source:string

    @IsString()
    destination:string

    @IsString()
    departure_time:string

    @IsString()
    Stop_duration:string
    
    @IsString()
    ride_Date:string

    @IsInt()
    fare:number
    
    @IsString()
    current_location:string
}
