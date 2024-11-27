import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiForbiddenResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @ApiForbiddenResponse({example:{mensage: 'token not found'}})
    @ApiOkResponse({type:User})
}
