import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { User } from "./User"

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user: number

  @Column()
  number_choices: number

  @Column()
  vote_anyway: boolean

  @Column()
  time: number
}
