import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Gift } from './Gift'

@Entity()
export class Giver {

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @OneToOne(() => Gift, gift => gift.giver)
    gift: Gift
}