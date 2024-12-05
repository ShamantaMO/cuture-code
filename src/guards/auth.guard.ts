import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new ForbiddenException('token não encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT_SECRET'), ignoreExpiration: true });

      request.user = payload;
    } catch (error) {
      console.error('Erro:', error);
      throw new UnauthorizedException('token invalido');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    console.log(request.headers?.authorization)
    const [type, token] = request.headers?.authorization?.split(' ') || []

    return type === 'Bearer' ? token : null;
  }
}