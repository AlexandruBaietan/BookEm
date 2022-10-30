import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import 'reflect-metadata'

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    lastName: string

    @Column()
    permissionLevel: string
}
