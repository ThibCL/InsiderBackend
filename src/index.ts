import "reflect-metadata"
import { createConnection } from "typeorm"
import { Game } from "./entity/Game"
import { User } from "./entity/User"

createConnection()
  .then(async (connection) => {
    console.log("Get player")
    let user = await connection
      .getRepository(User)
      .findOne({ id: "104650179185207162202" })

    console.log("Insert Games")
    let game1 = new Game()
    game1.user = user
    connection.getRepository(Game).save(game1)

    let game2 = new Game()
    game2.user = user
    connection.getRepository(Game).save(game2)

    console.log("Here you can setup and run express/koa/any other framework.")
  })
  .catch((error) => console.log(error))
