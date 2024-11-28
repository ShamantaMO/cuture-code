import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse } from "@nestjs/swagger"
import { AuthGuard } from "src/guards/auth.guard"
import { RolesGuard } from "src/guards/role.guard"
import { ProductsService } from "./products.service"
import { RoleEnum } from "src/enum/role.enum"
import { Roles } from "src/enum/role.decorator"
import { CreateProdutsDto } from "src/products/dtos/createproducts.dto"

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
  @Post('create')
  async create(@Body() body: CreateProdutsDto){
    return await this.productsService.create(body)
  }

  @ApiParam({type: Number, example: 7, name: 'id'})
  @ApiCreatedResponse({type: ResponseRewardDoc})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiNotFoundResponse({example: `This product with id: 7 not found or no stock`})
  @ApiBadRequestResponse({example: 'Insufficient jewels'})
  @Post('reward/:id')
  async reward(@Param('id' , ParseIntPipe) id: number, @UserDecorator() userDeco: UserDecoratorDTO){
    return await this.productsService.reward(id, userDeco)
  }

  @ApiParam({type: Number, example: 9, name: 'id'})
  @ApiOkResponse({type: ResponseCreateProductDoc})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiNotFoundResponse({example: `This product with id: 9 not found or no stock`})
  @Get(':id')
  async productById(@Param('id', ParseIntPipe) id:number){
    return await this.productsService.productById(id)
  }
  
  @ApiParam({type: Number, example: 9, name: 'id'})
  @ApiBody({type: UpdateProductDoc})
  @ApiOkResponse({type: ResponseCreateProductDoc})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiNotFoundResponse({example: `This product with id: 9 not found or no stock`})
  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductsDto){
    return await this.productsService.update(id, body)
  }

  @ApiParam({type: Number, example: 3, name: 'id'})
  @ApiOkResponse({example: {message: 'Product deleted'}})
  @ApiForbiddenResponse({example: {message: "token not found"}})
  @ApiNotFoundResponse({example: `This product with id: 3 not found or no stock`})
  @Roles(RoleEnum.admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number){
    return await this.productsService.delete(id)
  }

  
}