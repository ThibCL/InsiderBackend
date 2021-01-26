import { Connection, createConnection } from "typeorm"
import { Game } from "../src/entity/Game"
import { Option } from "../src/entity/Option"
import { Player } from "../src/entity/Player"

export class Handler {
  getGame = async (req, res) => {
    let connection: Connection
    try {
      connection = await createConnection()
      const gameRepo = connection.getRepository(Game)

      let id = req.params.gameId
      console.log(id)
      const game = await gameRepo
        .createQueryBuilder("game")
        .where({ user: req.body.decoded.id, id: id })
        .leftJoinAndSelect("game.players", "player")
        .leftJoinAndSelect("game.option", "option")
        .getOne()

      res.send(JSON.stringify({ game }))
    } catch (e) {
      console.log(e)
    } finally {
      await connection.close()
    }
  }

  listGames = async (req, res) => {
    let connection: Connection
    try {
      connection = await createConnection()
      const gameRepo = connection.getRepository(Game)

      const listGames = await gameRepo
        .createQueryBuilder("game")
        .where({ user: req.body.decoded.id })
        .leftJoinAndSelect("game.players", "player")
        .leftJoinAndSelect("game.option", "option")
        .getMany()
      res.send(JSON.stringify({ listGames: listGames }))
    } catch (e) {
      console.log(e)
    } finally {
      await connection.close()
    }
  }

  addGame = async (req, res) => {
    let connection: Connection
    try {
      connection = await createConnection()
      const gameRepo = connection.getRepository(Game)

      let game: Game = req.body.game
      game.user = req.body.decoded
      console.log(game)
      await gameRepo.save(game)

      console.log(game)

      res.send(JSON.stringify({ game: game }))
    } catch (e) {
      console.log(e)
      res.send()
    } finally {
      await connection.close()
    }
  }

  updateGame = async (req, res) => {
    let connection: Connection
    try {
      connection = await createConnection()

      const gameRepo = connection.getRepository(Game)
      let game = req.body.game
      game.user = { id: req.body.decoded.id }
      await gameRepo.save(game)

      res.send()
    } catch (e) {
      console.log(e)
    } finally {
      await connection.close()
    }
  }

  deleteGame = async (req, res) => {
    let connection: Connection
    try {
      connection = await createConnection()

      const playerRepo = connection.getRepository(Player)
      await playerRepo.delete({ game: { id: req.params.gameId } })

      const gameRepo = connection.getRepository(Game)
      const game = await gameRepo
        .createQueryBuilder("game")
        .where({ id: req.params.gameId })
        .leftJoinAndSelect("game.option", "option")
        .getOne()
      await gameRepo.delete({
        id: req.params.gameId,
        user: req.body.decoded.id,
      })

      const optionRepo = connection.getRepository(Option)
      await optionRepo.delete({ id: game.option.id })

      res.send()
    } catch (e) {
      console.log(e)
    } finally {
      await connection.close()
    }
  }
}
