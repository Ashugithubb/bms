import { IsEmail, IsEnum, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../enums/all.enums";

export class CreateUserDto {
    @IsString()
    first_name:string

    @IsString()
    last_name:string

    @IsEmail()
    email:string

    @IsStrongPassword()
    password:string

    @IsPhoneNumber()
    phone:string

    @IsEnum(Role)
    role:Role
}
