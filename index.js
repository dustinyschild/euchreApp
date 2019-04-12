"use strict";

const prompt = require("syncprompt");

//import model factories
const Game = require("./models/Game");
const Round = require("./models/Round");
const Player = require("./models/Player");
const Team = require("./models/Team");
const Deck = require("./models/Deck");

const deck = new Deck();
const game = new Game(deck);

console.log("Starting game... ");

const user = new Player(prompt("What is your name?: "));
game.players.push(user);

//mock players
var mockPlayerNames = ["Mal", "Jim", "Jenn"];
for (var i = 0; i < 3; i++) {
  game.players.push(new Player(mockPlayerNames[i]));
}

console.log("Players this match: ", game.players.map(player => player.name));

//intialize teams
game.teams = [
  new Team(game.players[0],game.players[2]),
  new Team(game.players[1],game.players[3])
];

console.log(`Your teammate is ${game.teams[0].players[1].name}`);
console.log(`You will be playing against ${game.teams[1].players[0].name} and ${game.teams[1].players[1].name}`);

//game loop
while (game.inProgress) {
  //assign dealer
  console.log("Dealing cards to determine the first dealer...");
  console.log(`${game.assignDealer()} will deal first.`);
  game.setActivePlayer(game.dealer);
  console.log("ACTIVE AND DEALER", game.activePlayer, game.dealer);

  const round = new Round();
  game.currentRound = round;
  while (round.inProgress) {
    deck.shuffle();

    //deal cards
    for (var i = 0; i < 20; i++) {
      game.players[i%4].hand.push(deck.drawCard());
    }

    game.players.map(player => console.log(`${player.name}'s hand: `, player.hand));
    console.log("Cards left: ", deck.cards);

    //phase 1:
    //pass action between players to select trump suit
    //when trump suit is selected assign it to the dealer and allow discard.
    var trumpSuit = deck.translateCard(deck.drawCard()).suit;
    for (var i = 0; i < 3; i++) {
      game.getNextPlayer(game.activePlayer);
      console.log("\nACTIVE PLAYER", game.activePlayer)
      if (game.activePlayer.name === user.name) {
        const playerChoice = prompt(`${game.activePlayer.name} would you like ${trumpSuit} to be trump? y = yes / n = no`);

      }

    }

    //phase 2:
    //take turns playing cards, highest card wins. Winner of the hand goes first next round. (5x)
    //
    prompt()
  }



  prompt()
}