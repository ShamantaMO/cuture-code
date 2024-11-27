import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

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
    
    async profile()
}
