import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserRegisterDoc } from 'src/docs/user-register.doc';
import { UserDoc } from 'src/docs/response-user-register.doc';
import { LoginDto } from 'src/dtos/login.dto';
import { ResponseFindAllProductsDoc } from 'src/docs/response-allProducts.doc';



@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiBody({type: UserRegisterDoc})
    @ApiCreatedResponse({type:UserDoc})
    @ApiUnauthorizedResponse({example: 'Cedencial Invalida'})
    @Post('login')
    async login(@Body() body: LoginDto){
        return await this.authService.login(body)
    }

    @ApiQuery({type: Number, example: 24, name: 'price', required: false})
    @ApiQuery({type: String, example: 'Productivity Planner', name: 'name', required: false})
    @ApiQuery({type: Number, example: 1, name: 'page'})
    @ApiQuery({type: Number, example: 10, name: 'limit'})
    @ApiOkResponse({type: ResponseFindAllProductsDoc})
    @ApiBadRequestResponse({example: 'página e limite obrigatórios'})
    @Get('find')
    async findAllProducts(
        @Query('page', ParseIntPipe) page = 1,
        @Query('limit', ParseIntPipe) limit = 10,
        @Query('price') price?: number,
        @Query('name') name?: string
    ){
        return await this.authService.findAllProducts(page,limit,price,name)
    }
}
