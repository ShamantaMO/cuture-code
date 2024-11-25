import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionEnum } from "src/enum/transaction.enum";
import { User } from "./users.entity";

@Entity()
export class Jewels{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length:25, unique: true})
    name: string

    @Column({type:"int"})
    price: number

    @Column({type:"enum", enum: TransactionEnum, default: TransactionEnum.Gift})
    TransactionType: TransactionEnum

    @Column({type: "bool", default: true})
    active: boolean

    @ManyToOne(() => User, (user) => user.jewels, {onDelete: 'CASCADE'})
    user: User

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}