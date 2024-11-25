import { RoleEnum } from "src/enum/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Jewels } from "./jewels.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length: 25})
    firstName: string

    @Column({type:"varchar", length: 25})
    lastName: string
    
    @Column({type:"varchar", length: 25, unique:true})
    email: string

    @Column({type:"varchar", length: 8, select:false})
    password:string

    @Column({type:"enum", enum:RoleEnum, default:RoleEnum.user})
    role?: RoleEnum

    @Column({type:"int", default: 0})
    coins: number

    @OneToMany(() => Jewels, (jewels) => jewels.user)
    jewels: Jewels[]
}