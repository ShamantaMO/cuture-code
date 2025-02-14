import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } 
    from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from '../auth/dtos/login.dto';
import { ResponseFindAllProductsDoc } from '../auth/docs/response-allProducts.doc';
import { userRegisterDto } from '../auth/dtos/user-register.dto';
import { UserDoc } from './docs/response-user-register.doc';
import { UserRegisterDoc } from './docs/user-register.doc';
import { LoginDoc } from './docs/login.doc';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiBody({ type: UserRegisterDoc })
    @ApiCreatedResponse({ type: UserDoc })
    @ApiBadRequestResponse({ example: 'usuario existente.' })
    @Post('register')
    async register(@Body() body: userRegisterDto) {
      return await this.authService.register(body);
    }

    @ApiBody({type: LoginDoc})
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
