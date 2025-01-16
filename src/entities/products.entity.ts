import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.entity";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length: 20, unique:true})
    name: string

    @Column({type: "int"})
    price: number

    @Column({type: "bool", default: true})
    inStock: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({type: Date, default: null})
    deleteAt: Date

    @OneToMany(() => User, (user)=> user.productsPurchased)
    buyer: User
}