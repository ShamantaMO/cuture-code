import { PartialType } from '@nestjs/swagger';
import { userRegisterDto } from 'src/auth/dtos/user-register.dto';

export class UpdateUsersDto extends PartialType(userRegisterDto) {}
