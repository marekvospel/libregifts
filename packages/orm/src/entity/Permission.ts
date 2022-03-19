import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Permission {

  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @ManyToMany(() => User, user => user.permissions)
    users: User[]
}