import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { Game } from "./Game"

@Entity()
export class User {
  @PrimaryColumn()
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToMany(() => Game, (game) => game.user)
  games: Game[]
}
