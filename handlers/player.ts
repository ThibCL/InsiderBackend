import { Connection, createConnection } from "typeorm"
import { Player } from "../src/entity/Player"

export class Handler {
  deletePlayer = async (req, res) => {
    let connection: Connection
    try {
      connection = await createConnection()
      const playerRepo = connection.getRepository(Player)

      const gameId = req.params.gameId
      const playerId = req.params.playerId
      console.log(gameId)
      console.log(playerId)

      await playerRepo.delete({
        id: playerId,
        game: { id: gameId, user: { id: req.body.decoded.id } },
      })
    } catch (e) {
      console.log(e)
    } finally {
      await connection.close()
    }
    res.send()
  }
}
