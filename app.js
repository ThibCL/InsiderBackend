"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
require("reflect-metadata");
var middleware_1 = require("./middleware");
var game_1 = require("./handlers/game");
var auth_1 = require("./handlers/auth");
var player_1 = require("./handlers/player");
var option_1 = require("./handlers/option");
var bodyParser = require("body-parser");
var port = process.env.PORT || 7171;
var app = express();
var gameHandler = new game_1.Handler();
var playerHandler = new player_1.Handler();
var optionHandler = new option_1.Handler();
var authHandler = new auth_1.Handler("578157949333-gdsu9a0325a42eiqf5mqt042gijhim3v.apps.googleusercontent.com");
app.use(bodyParser.json());
//Login
app.post("/login", authHandler.login);
//Game
app.get("/getGame/:gameId", middleware_1.checkToken, gameHandler.getGame);
app.get("/listGames", middleware_1.checkToken, gameHandler.listGames);
app.get("/deleteGame/:gameId", middleware_1.checkToken, gameHandler.deleteGame);
app.post("/addGame", middleware_1.checkToken, gameHandler.addGame);
app.post("/updateGame", middleware_1.checkToken, gameHandler.updateGame);
//Player
app.get("/deletePlayer/:gameId/:playerId", middleware_1.checkToken, playerHandler.deletePlayer);
//Option
app.get("/defaultOption", middleware_1.checkToken, optionHandler.getDefault);
app.post("/saveDefaultOption", middleware_1.checkToken, optionHandler.saveDefault);
app.listen(port, function () {
    console.log("App is listening on port " + port);
});
//# sourceMappingURL=app.js.map