"use strict";

const prompt = require("syncprompt");

//import model factories
const Game = require("./models/Game");
const Deck = require("./models/Deck");
const Player = require("./models/Player");

console.log("Starting game... ");

const game = new Game();
const deck = new Deck();

console.log(game.players);
console.log(deck.cards);

prompt("What is your name? ")

//mock players
var mockPlayerNames = ["Mal", "Jim", "Jenn"];
for (var i = 0; i < 3; i++) {
  game.players.push(new Player(mockPlayerNames[i]));
}
console.log("Players this match: ", game.players, game.inProgress);

//game loop
while (game.inProgress) {
  prompt("Ready to play? ")
}