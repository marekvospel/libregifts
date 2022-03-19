import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Giver } from './Giver'

@Entity()
export class Gift {

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @OneToOne(() => Giver, giver => giver.gift)
  @JoinColumn()
    giver: Giver
}