import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.entity";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length: 20, unique:true})
    name: string

    @Column({type: "int"})
    price: number

    @Column({type: "bit", default: 0})
    inStock: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({type: Date, default: null})
    deleteAt: Date

    @ManyToOne(() => User, (user)=> user.id)
    buyer: User
}