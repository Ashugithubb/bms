import { IsInt, IsString } from "class-validator";

export class CreateTicketDto {
    @IsString()
    stop_from:string

    @IsString()
    stop_to:string

    @IsInt()
    fare:number

}
