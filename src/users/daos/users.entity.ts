import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import 'reflect-metadata'

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    permissionLevel: string
}
