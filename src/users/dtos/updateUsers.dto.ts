import { PartialType } from "@nestjs/swagger";
import { userRegisterDto } from "src/dtos/user-register.dto";

export class UpdateUsersDto extends PartialType(userRegisterDto){}