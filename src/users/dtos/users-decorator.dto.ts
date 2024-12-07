import { RoleEnum } from 'src/enum/role.enum';

export class UsersDecoratorDTO {
  userId: number;
  userEmail: string;
  userRole: RoleEnum;
  iss: string;
  aud: string;
}
