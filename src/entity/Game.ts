import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Player } from "./Player"
import { User } from "./User"

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Player, (player) => player.game, { cascade: true })
  players: Player[]

  @ManyToOne(() => User, (user) => user.games)
  user: User
}
