import { IsEnum, IsIn, IsInt, IsString } from "class-validator";
import { Category } from "../enums/bus.enum";

export class CreateBusDto {
    @IsString()
    regno:string
       
    @IsString()
    model:string

    @IsString()
   color:string

    @IsInt()
    total_seats:number


    @IsEnum(Category)
    category:Category   
}
