import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Gift } from './Gift'

@Entity()
export class Giver {

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ length: 250 })
    name: string

  @Column({ length: 250 })
    email: string

  @Column({ length: 25 })
    phone: string

  @OneToOne(() => Gift, gift => gift.giver)
    gift: Gift
}
