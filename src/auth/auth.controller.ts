import { Body, Controller, Get, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserRegisterDoc } from "./docs/user-register.doc";
import { UserDoc } from "./docs/response-user-register.doc";
import { userRegisterDto } from "./dtos/user-register.dto";
import { LoginDoc } from "./docs/login.doc";
import { TokenDoc } from "./docs/token.doc";
import { LoginDto } from "./dtos/login.dto";
import { ResponseFindAllProductsDoc } from "./docs/response-allProducts.doc";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserRegisterDoc })
  @ApiCreatedResponse({ type: UserDoc })
  @ApiBadRequestResponse({ example: 'user already exists' })
  @Post('register')
  async register(@Body() body: userRegisterDto) {
    return await this.authService.register(body);
  }

  @ApiBody({ type: LoginDoc })
  @ApiCreatedResponse({ type: TokenDoc })
  @ApiUnauthorizedResponse({ example: 'invalid credentials' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @ApiQuery({type: Number, example: 24, name: 'price', required: false})
  @ApiQuery({type: String, example: 'Productivity Planner', name: 'name', required: false})
  @ApiQuery({type: Number, example: 1, name: 'page'})
  @ApiQuery({type: Number, example: 5, name: 'limit'})
  @ApiOkResponse({type: ResponseFindAllProductsDoc})
  @ApiBadRequestResponse({example: 'required page and limit'})
  @Get('find')
  async findAllProducts(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 5,
    @Query('price') price?: number,
    @Query('name') name?: string,
  ) {
    return await this.authService.findAllProducts(page, limit, price, name);
  }
}