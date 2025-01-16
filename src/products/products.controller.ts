import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, 
  ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger"
import { AuthGuard } from "../guards/auth.guard"
import { RolesGuard } from "../guards/role.guard"
import { ProductsService } from "./products.service"
import { RoleEnum } from "../enum/role.enum"
import { Roles } from "../enum/role.decorator"
import { CreateProdutsDto } from "../products/dtos/createproducts.dto"
import { ResponseCreateProductDoc } from "./docs/response-create-products.doc"
import { CreateProductDoc } from "./docs/create-products.doc"
import { UsersDecorator } from "../users/users-decorator"
import { ResponseRewardDoc } from "./docs/response-rewards.doc"
import { UsersDecoratorDTO } from "../users/dtos/users-decorator.dto"
import { UpdateProductDoc } from "./docs/update-response.doc"
import { UpdateProductsDto } from "./dtos/update-products.dto"

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBody({type: CreateProductDoc})
  @ApiOkResponse({type: ResponseCreateProductDoc})
  @ApiBadRequestResponse({example: 'Produto ja existe'})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @Roles(RoleEnum.admin)
  @Post()
  async create(@Body() body: CreateProdutsDto){
    return await this.productsService.create(body)
  }

  @ApiParam({type: Number, example: 7, name: 'id'})
  @ApiCreatedResponse({type: ResponseRewardDoc})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @ApiNotFoundResponse({example: `Este produto com o ID: 7 não foi encontrado ou está sem estoque`})
  @ApiBadRequestResponse({example: 'Insufficient jewels'})
  @Post('reward/:id')
  async reward(@Param('id' , ParseIntPipe) id: number, @UsersDecorator() userDeco: UsersDecoratorDTO){
    return await this.productsService.reward(id, userDeco)
  }

  @ApiParam({type: Number, example: 8, name: 'id'})
  @ApiOkResponse({type: ResponseCreateProductDoc})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @ApiNotFoundResponse({example: `Este produto com o ID: 8 não foi encontrado ou está sem estoque`})
  @Get(':id')
  async productById(@Param('id', ParseIntPipe) id:number){
    return await this.productsService.productById(id)
  }
  
  @ApiParam({type: Number, example: 9, name: 'id'})
  @ApiBody({type: UpdateProductDoc})
  @ApiOkResponse({type: ResponseCreateProductDoc})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @ApiNotFoundResponse({example: `Este produto com o ID: 9 não foi encontrado ou está sem estoque`})
  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductsDto){
    return await this.productsService.update(id, body)
  }

  @ApiParam({type: Number, example: 3, name: 'id'})
  @ApiOkResponse({example: {message: 'Produto deletado'}})
  @ApiForbiddenResponse({example: {message: "Token não encontrado"}})
  @ApiNotFoundResponse({example: `Este produto com o ID: 3 não foi encontrado ou está sem estoque`})
  @Roles(RoleEnum.admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number){
    return await this.productsService.delete(id)
  }

  
}