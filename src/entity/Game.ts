import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { Player } from "./Player"
import { User } from "./User"
import { Option } from "./Option"

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  finished: boolean

  @OneToMany(() => Player, (player) => player.game, { cascade: true })
  players: Player[]

  @ManyToOne(() => User, (user) => user.games)
  user: User

  @OneToOne(() => Option, { cascade: true })
  @JoinColumn()
  option: Option
}
