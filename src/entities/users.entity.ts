import { RoleEnum } from "src/enum/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Jewels } from "./jewels.entity";
import { Product } from "./products.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length: 25})
    firstName: string

    @Column({type:"varchar", length: 25})
    lastName: string
    
    @Column({type:"varchar", length: 250, unique:true})
    email: string

    @Column({type:"varchar", length: 500, select:false})
    password:string

    @Column({type:"enum", enum:RoleEnum, default:RoleEnum.user})
    role?: RoleEnum

    @Column({type:"int", default: 0})
    coins: number
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({type: Date, default: null})
    deleteAt: Date

    @OneToMany(() => Jewels, (jewels) => jewels.user)
    jewels: Jewels[]

    @OneToMany(()=> Product, (product) => product.buyer)
    productsPurchased: Product[]
}