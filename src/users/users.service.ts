import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from './dtos/updateUsers.dto';
import { UserDecoratorDTO, UsersDecoratorDTO } from './dtos/users-decorator.dto';
import { RoleEnum } from 'src/enum/role.enum';
import { userRegisterDto } from 'src/dtos/user-register.dto';
import { error } from 'console';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async findByEmail(email: string) {
        try {
          return this.usersRepository.findOne({
            where: { email },
            select: { password: true, email: true, id: true, role: true },
          });
        } catch (error) {
          console.error(error);
          throw new HttpException(error.message, error.status);
        }
    }

    async findById(id:number) {
        try {
            const user = await this.usersRepository.findOne({where:{id}})

            if (!user) {
                throw new NotFoundException(`Usuário com o ID: ${id} não encontrado!`)
            }

            return(user)
        }catch(error) {
            console.error(error)
            throw new HttpException(error.message, error.status)
        }
    }

    async userById(id: number) {
        try {
            await this.findById(id)

            return await this.usersRepository.findOne({
                where:{id},
                select:{id: true, firstName: true, lastName: true, coins:true},
                relations: { jewels: true, productsPuchase: true}
            })
        }catch (error) {
            console.error(error);
            throw new HttpException(error.message, error.status);
        }
    }

    async findAll() {
        try {
            return await this.usersRepository.find()
        }catch (error) {
            console.error(error)
            throw new HttpException(error.mensage, error.status)
        }
    }
    
    async profile(user: UserDecoratorDTO) {
        try{
            return await this.usersRepository.findOne({
                where: {id: this.userId},
                relations: {productsPurchased: true, jewels: true}
            })
        }catch(error){
            console.error(error)
            throw new HttpException(error.mensage, error.status)
        }
    }

    async update(id: number, body: UpdateUsersDto, user:UsersDecoratorDTO) {
        try {
            await this.usersRepository.findOne({where: {id}, select: {id: true}})

            if (user.userRole !==RoleEnum.admin && user.userId !== Number(id)) {
                throw new UnauthorizedException(
                    'Você não tem permissões para atualizar outros usuários.'
                )
            }
            await this.usersRepository.update(id,body)
            return await this.usersRepository.findOneBy({id})
        }catch(error){
            console.error(error)
            throw new HttpException(error.mensage, error.status)
        }
    }

    async delete(id: number, user: UsersDecoratorDTO) {
        try {
          await this.usersRepository.findOne({where: {id}, select: {id: true}});
    
          if (user.userRole !== RoleEnum.admin && user.userId !== id) {
            throw new UnauthorizedException(
              'Você não tem permissão para atualizar outros usuários.',
            );
        }
        await this.usersRepository.softDelete(id)
        return {message: 'ok'}
        }catch (error){
        console.error(error)
        throw new HttpException(error.mensage, error.status)
    }
    }
}
