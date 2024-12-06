import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionEnum } from "src/enum/transaction.enum";
import { User } from "./users.entity";

@Entity()
export class Jewels{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length:25, unique: true})
    name: string

    @Column({type:"varchar", length:250})
    description: string

    @Column({type:"int"})
    price: number

    @Column({type:"enum", enum: TransactionEnum, default: TransactionEnum.Gift})
    transactionType: TransactionEnum

    @Column({type: "bool", default: true})
    active: boolean

    @ManyToMany(() => User, (user) => user.jewels)
    user: User

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}