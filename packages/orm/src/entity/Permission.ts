import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Permission {

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @ManyToMany(() => User, user => user.permissions)
    users: User[]
}