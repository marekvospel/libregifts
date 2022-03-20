import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
      id: string

    @Column({ length: 250 })
      firstName: string

    @Column({ length: 250 })
      lastName: string

    @Column({ unique: true, length: 250 })
      email: string

    @Column({ length: 250 })
      password: string
}
