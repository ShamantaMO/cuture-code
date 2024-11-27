import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/enum/role.enum";

export class UserDoc {
    @ApiProperty({
      description: 'User identification',
      type: Number,
      example: 13,
      name: 'Id',
    })
    id: number;
  
    @ApiProperty({
      description: 'User first name',
      type: String,
      example: 'Maria Clara',
      title: 'First Name',
    })
    firstName: string;
  
    @ApiProperty({
      description: 'User last name',
      type: String,
      example: 'Silva Pereira',
      title: 'Last Name',
      required: false,
    })
    lastName: string;
  
    @ApiProperty({
      description: 'User email',
      type: String,
      example: 'mariaclara.silva@exemplo.com',
      title: 'Email',
    })
    email: string;
  
    @ApiProperty({
      description: 'User password',
      type: String,
      example: 'senhaSegura123',
      title: 'Password',
    })
    password: string;
  
    @ApiProperty({
      description: 'User role',
      enum: RoleEnum,
      example: RoleEnum.user,
      title: 'Role',
      required: false,
    })
    role: RoleEnum;
  
    @ApiProperty({
      description: 'Whether the user\'s email is verified',
      type: Boolean,
      example: true,
      name: 'Email Verified',
    })
    emailVerified: boolean;
  
    @ApiProperty({
      description: 'Coins that the user owns',
      type: Number,
      example: 10,
      name: 'Coins',
    })
    coins: number;
  
    @ApiProperty({
      description: 'User creation date',
      type: Date,
      example: '2024-01-01T00:00:00.000Z',
      name: 'Created At',
    })
    createdAt: Date;
  
    @ApiProperty({
      description: 'User update date',
      type: Date,
      example: '2024-01-15T12:00:00.000Z',
      name: 'Updated At',
    })
    updatedAt: Date;
  
    @ApiProperty({
      description: 'User deletion date, if deleted',
      type: Date,
      example: null,
      name: 'Deleted At',
    })
    deletedAt: Date;
  }
  