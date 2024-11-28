import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const UsersDecorator = createParamDecorator((data: unknown, context: ExecutionContext) => {
    if(context.getType() === 'http'){
        const {user} = context.switchToHttp().getRequest()
        console.log('Request UsersDecorator', user)
        if(!user){
            throw new UnauthorizedException('User not found in request')
        }
        return user
    }
})