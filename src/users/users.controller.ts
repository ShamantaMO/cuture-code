import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { UsersService } from './users.service';
import { UsersDecorator } from './users-decorator';
import { UsersDecoratorDTO } from './dtos/users-decorator.dto';
import { UserRelationsDoc } from './docs/users-relations.doc';
import { ResponseUserDoc } from './docs/response-users.doc';
import { RoleEnum } from 'src/enum/role.enum';
import { Roles } from 'src/enum/role.decorator';
import { UpdateUserDoc } from './docs/update-users.doc';
import { UpdateUsersDto } from './dtos/updateUsers.dto';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiForbiddenResponse({ example: { message: 'token não encontrado' } })
  @ApiOkResponse({ type: UserRelationsDoc })
  @Get('perfil')
  async profile(@UsersDecorator() user: UsersDecoratorDTO) {
    return await this.userService.profile(user);
  }

  @ApiOkResponse({ type: [ResponseUserDoc] })
  @ApiForbiddenResponse({ example: { message: 'token não encontrado' } })
  @Roles(RoleEnum.admin)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiParam({ type: Number, example: 4, name: 'id' })
  @ApiForbiddenResponse({ example: { message: 'token não encontrado' } })
  @ApiOkResponse({ type: ResponseUserDoc })
  @Roles(RoleEnum.admin)
  @Get(':id')
  async userById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.userById(id);
  }

  @ApiParam({ type: Number, example: 4, name: 'id' })
  @ApiBody({ type: UpdateUserDoc })
  @ApiForbiddenResponse({ example: { message: 'token não encontrado' } })
  @ApiUnauthorizedResponse({
    example: 'Você não tem permissão para atualizar outros usuários.',
  })
  @ApiOkResponse({ type: ResponseUserDoc })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUsersDto,
    @UsersDecorator() user: UsersDecoratorDTO,
  ) {
    return await this.userService.update(id, body, user);
  }

  @ApiParam({ type: Number, example: 4, name: 'id' })
  @ApiForbiddenResponse({ example: { message: 'token não encontrado' } })
  @ApiUnauthorizedResponse({
    example: 'Você não tem permissão para atualizar outros usuários.',
  })
  @ApiOkResponse({ example: { message: 'ok' } })
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @UsersDecorator() user: UsersDecoratorDTO,
  ) {
    return await this.userService.delete(id, user);
  }
}
