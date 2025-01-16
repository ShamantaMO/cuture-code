import { PartialType } from "@nestjs/swagger";
import { userRegisterDto } from "../../auth/dtos/user-register.dto";

export class UpdateUsersDto extends PartialType(userRegisterDto){}