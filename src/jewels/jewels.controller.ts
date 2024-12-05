import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateJewelsDto } from './dtos/update-jewels.dto';
import { Roles } from 'src/enum/role.decorator';
import { RoleEnum } from 'src/enum/role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseCreateJewelsDoc } from './docs/resp-create-jewels.doc';
import { UpdateJewelsDoc } from './docs/update-jewels.doc';
import { CreateJewelsDto } from './dtos/create-jewels.dto';
import { CreateJewelsDoc } from './docs/create-jewels.doc';
import { ResponseDistribuiteJewelsDoc } from './docs/resp-distribuite-jewels.doc';
import { JewelsService } from './jewels.service';
import { RolesGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Jewels')
@UseGuards(AuthGuard, RolesGuard)
@Controller('jewels')
export class JewelsController {
  constructor(private readonly jewelsService: JewelsService) {}

  @ApiParam({type: Number, example: 2, name: 'userId'})
  @ApiParam({type: Number, example: 9, name: 'jewelId'})
  @ApiCreatedResponse({type: ResponseDistribuiteJewelsDoc})
  @ApiNotFoundResponse({example: 'Usuário ou joia não encontrada, ou a joia está inativa'})
  @ApiForbiddenResponse({example: {message: "token não encontrado"}})
  @Roles(RoleEnum.admin)
  @Post('assign/:userId/jewels/:jewelId')
  async distribuiteJewels(@Param('userId', ParseIntPipe) userId: number, @Param('jewelId', ParseIntPipe) jewelId: number){
    return await this.jewelsService.distribuiteJewels(userId, jewelId)
  }

  @ApiBody({type: CreateJewelsDoc})
  @ApiCreatedResponse({type: ResponseCreateJewelsDoc})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @ApiBadRequestResponse({example: 'Esta joia já existe.'})
  @Roles(RoleEnum.admin)
  @Post('create')
  async create(@Body() body: CreateJewelsDto) {
    return await this.jewelsService.create(body);
  }

  @ApiOkResponse({type: [ResponseCreateJewelsDoc]})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @Get()
  async findAll(){
    return await this.jewelsService.findAll()
  }

  @ApiParam({type: Number, example: 9, name: 'id'})
  @ApiCreatedResponse({type: ResponseCreateJewelsDoc})
  @ApiNotFoundResponse({example: `Este produto com o ID: 9 não foi encontrado!`})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @Get(':id')
  async jewelById(@Param('id', ParseIntPipe) id: number) {
    return await this.jewelsService.jewelById(id);
  }

  @ApiParam({type: Number, example: 9, name: 'id'})
  @ApiBody({type: UpdateJewelsDoc})
  @ApiOkResponse({type:  ResponseCreateJewelsDoc})
  @ApiNotFoundResponse({example: `Este produto com o ID: 9 não foi encontrado!`})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateJewelsDto){
    return await this.jewelsService.update(id, body)
  }

  
}
