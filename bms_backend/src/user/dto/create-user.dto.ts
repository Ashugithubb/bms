import { IsEmail, IsEnum, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Gender, Role } from "../enums/all.enums";

export class CreateUserDto {
    @IsString()
    first_name:string

    @IsString()
    last_name:string

    @IsEnum(Gender)
    gender:Gender

    @IsEmail()
    email:string

    @IsStrongPassword()
    password:string

    @IsString()
    phone:string

    @IsEnum(Role)
    role:Role
}
