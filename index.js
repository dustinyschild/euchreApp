"use strict";

const prompt = require("syncprompt");

//import model factories
const Game = require("./models/Game");
const Deck = require("./models/Deck");
const Player = require("./models/Player");

console.log("Starting game... ");

const game = new Game();
const deck = new Deck();

console.log(deck.cards);

const user = prompt("What is your name? ");
game.players.push(new Player(user));

//mock players
var mockPlayerNames = ["Mal", "Jim", "Jenn"];
for (var i = 0; i < 3; i++) {
  game.players.push(new Player(mockPlayerNames[i]));
}
console.log("Players this match: ", game.players.map(player => player.name));
console.log("Team 1", game.team1.members);
console.log("Team 2", game.team2.members);

//game loop
while (game.inProgress) {
  if(prompt("Game loop") === "\n") return;
}