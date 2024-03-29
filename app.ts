import express = require("express")
import "reflect-metadata"
import { checkToken } from "./middleware"
import { Handler as GameHandler } from "./handlers/game"
import { Handler as AuthHandler } from "./handlers/auth"
import { Handler as PlayerHandler } from "./handlers/player"
import { Handler as OptionHandler } from "./handlers/option"

const bodyParser = require("body-parser")

const port = process.env.PORT || 7171
const app: express.Application = express()
const gameHandler = new GameHandler()
const playerHandler = new PlayerHandler()
const optionHandler = new OptionHandler()
const authHandler = new AuthHandler(
  "578157949333-gdsu9a0325a42eiqf5mqt042gijhim3v.apps.googleusercontent.com"
)

app.use(bodyParser.json())
//Login
app.post("/login", authHandler.login)

//Game
app.get("/getGame/:gameId", checkToken, gameHandler.getGame)
app.get("/listGames", checkToken, gameHandler.listGames)
app.get("/deleteGame/:gameId", checkToken, gameHandler.deleteGame)

app.post("/addGame", checkToken, gameHandler.addGame)
app.post("/updateGame", checkToken, gameHandler.updateGame)

//Player
app.get(
  "/deletePlayer/:gameId/:playerId",
  checkToken,
  playerHandler.deletePlayer
)

//Option
app.get("/defaultOption", checkToken, optionHandler.getDefault)

app.post("/saveDefaultOption", checkToken, optionHandler.saveDefault)
app.listen(port, function () {
  console.log("App is listening on port " + port)
})
