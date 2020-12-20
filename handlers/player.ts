import { createConnection } from "typeorm"
import { Player } from "../src/entity/Player"

export class Handler {
  deletePlayer = async (req, res) => {
    const connection = await createConnection()
    const playerRepo = connection.getRepository(Player)

    const gameId = req.params.gameId
    const playerId = req.params.playerId
    console.log(gameId)
    console.log(playerId)

    await playerRepo.delete({
      id: playerId,
      game: { id: gameId, user: { id: req.body.decoded.id } },
    })
    await connection.close()

    res.send()
  }
}
