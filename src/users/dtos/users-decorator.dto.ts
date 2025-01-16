import { RoleEnum } from "../../enum/role.enum";


export class UsersDecoratorDTO{
    
    userId: number;
    userEmail: string;
    userRole: RoleEnum;
    iss: string;
    aud: string;
}