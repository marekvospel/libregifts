import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Permission } from './Permission'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
      id: number

    @Column()
      firstName: string

    @Column()
      lastName: string

    @Column({ unique: true })
      email: string

    @Column()
      password: string

    @ManyToMany(() => Permission, permission => permission.users)
    @JoinTable()
      permissions: Permission[]
}
