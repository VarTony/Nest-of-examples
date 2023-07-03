import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min, ValidateIf } from "class-validator";

class AuthUserDTO {
    @IsString()
    @Length(1, 50)
    login?: string;

    @ValidateIf((user: AuthUserDTO) => Boolean(user.login))
    @IsString()
    @IsEmail()
    email?: string;

    @IsString()
    @Length(7, 15)
    password: string;
}

export { AuthUserDTO };