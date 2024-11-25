import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length: 20, unique:true})
    name: string

    @Column({type: "int"})
    price: number

    @Column({type: "enum", enum: })
}