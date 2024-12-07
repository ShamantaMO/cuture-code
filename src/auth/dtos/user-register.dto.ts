import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleEnum } from 'src/enum/role.enum';


export class userRegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsOptional()
  coins: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  role?: RoleEnum;
}
