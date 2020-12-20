import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Game } from "./Game"

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  score: number

  @ManyToOne(() => Game, (game) => game.players)
  game: Game
}
