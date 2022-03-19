import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Gift } from './Gift'

@Entity()
export class Giver {

  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @OneToOne(() => Gift, gift => gift.giver)
    gift: Gift
}