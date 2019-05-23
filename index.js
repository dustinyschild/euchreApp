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
  console.log("Dealing cards to determine the dealer...");
  console.log(`${game.assignDealer()} will deal.`);
  game.setActivePlayer(game.dealer);
  console.log("ACTIVE AND DEALER", game.activePlayer, game.dealer);

  const round = new Round();
  game.currentRound = round;
  console.log("Shuffling...")
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
  let trumpCard = deck.translateCard(deck.drawCard());
  let trumpSuit = { suit: trumpCard.suit, color: trumpCard.color };

  //mock player responses
  game.players[3].mocks.trumpChoice = "n";
  game.players[1].mocks.trumpChoice = "n";
  game.players[2].mocks.trumpChoice = "n";

  let playerChoice = null;
  for (var i = 0; i < 4; i++) {
    const nextPlayer = game.getNextPlayer(game.activePlayer);
    game.setActivePlayer(nextPlayer);

    if (game.activePlayer.name === user.name) {
      playerChoice = prompt(`${game.activePlayer.name} would you like ${trumpSuit.suit} to be trump? y = yes / n = no\n`);
    } else {
      playerChoice = game.players[i].mocks.trumpChoice;
    }

    let playersTeam = game.teams.filter(team => team.players.filter(player => player.id === game.activePlayer.id).length > 0)[0];
    let opposingTeam = game.teams.filter(team => team.players.filter(player => player.name === game.activePlayer.name).length === 0)[0];

    // Refactor to "validations" file, wrap in try catch
    if (playerChoice === "y") {
      //set trump suit
      console.log(`${game.activePlayer.name} chose to order up trump!`);

      round.makers = playersTeam;
      round.defenders = opposingTeam;

      game.trumpSuit = trumpSuit;
      game.dealer.hand.push(trumpCard.id);

      if (game.dealer.name === user.name) {
      console.log(game.dealer.hand);
        const discardCard = prompt("Which card do you want to discard?");
        //Optimally there would be some validation checks here
          //Correct format
          //Player has card
        console.log(game.dealer.hand);
        game.dealer.hand.filter(playerCard => playerCard !== discardCard);
      } else {
        console.log("Dealer picks the card up and discards");
        game.dealer.hand.shift();
      }

      break;
    } else if (playerChoice === "n") {
      //move on to next player
      console.log(`${game.activePlayer.name} passes.`);
    } else {
      new Error("Not a valid input");
      //reset iteration
      i--;
      continue;
    }
  }

  game.players[3].mocks.trumpSelection = "Spades";
  game.players[1].mocks.trumpSelection = "Hearts";
  game.players[2].mocks.trumpSelection = "Diamonds";

  if (!game.trumpSuit) {
    for (var i = 0; i < 4; i++) {
      const nextPlayer = game.getNextPlayer(game.activePlayer);
      game.setActivePlayer(nextPlayer);
      console.log(`${game.activePlayer.name} may choose trump..............`);

      if (i === 3) {
        console.log("last loop");

        if (game.activePlayer.name === user.name) {
          trumpSuit = prompt("You must select trump. What will it be?\n");
        } else {
          trumpSuit = "Spades";
          console.log(`${game.players[i].name} chooses ${trumpSuit}`);
        }
      } else if (game.activePlayer.name === user.name) {
        playerChoice = prompt("Order up trump?");
        if (playerChoice === "y") {
          trumpSuit = prompt("Which suit?");
          break;
        }
      } else {
        trumpSuit = game.players[i].mocks.trumpSelection;
      }

    }

    round.makers = game.teams.filter(team => team.players.filter(player => player.id === game.activePlayer.id).length > 0)[0];
    round.defenders = game.teams.filter(team => team.players.filter(player => player.name === game.activePlayer.name).length === 0)[0];

    game.trumpSuit = trumpSuit;
    console.log(`${game.trumpSuit} is trump.`);
  }

  while (round.inProgress) {

    //phase 2:
    //take turns playing cards, highest card wins. Winner of the hand goes first next round. (5x)
    //

    //Reset to player left of the dealer
    game.setActivePlayer(game.getNextPlayer(game.dealer));

    console.log(`${game.activePlayer.name} leads first.`);

    let playerCard = null;
    game.players[0].mocks.playerCard = game.players[0].hand[0]
    game.players[1].mocks.playerCard = game.players[1].hand[0]
    game.players[2].mocks.playerCard = game.players[2].hand[0]
    game.players[3].mocks.playerCard = game.players[3].hand[0]

    for (var i = 0; i < 4; i++) {
      console.log(game.activePlayer.name)
      if (game.activePlayer.name === user.name) {
        playerCard = prompt(`Choose a card to play: \n${game.activePlayer.hand}`)
        //Default to first cardin hand.
        if (playerCard === "") playerCard = game.activePlayer.hand[0];
        console.log("YOUR CARD", playerCard)

        //validation blah blah blah
      } else {
        playerCard = game.players[i].mocks.playerCard
        console.log("THEIR CARD", playerCard, deck.translateCard(playerCard))
      }

      game.playCard(playerCard, game.activePlayer);
      game.activePlayer.playCard(playerCard);
      game.setActivePlayer(game.getNextPlayer(game.activePlayer));
    }

    //evaluate
    const winningPair = game.evaluateStack(game.stack);
    winningPair.player.tricks += 1;
    round.totalTricks += 1;

    round.inProgress = round.totalTricks < 5 ? true : false;
    game.players.map(player => console.log(player.name, player.tricks));
    prompt(`${winningPair.player.name} took the trick!`);

    game.stack = [];
  }

  //add trick count to teams
  game.players.map((player, i) => game.teams[i % 2].tricks += player.tricks);

  //reset game values
  game.trumpSuit = null;
  game.players.map(player => player.hand = []);
  prompt("Round End.");

  //award points
  const winningTeam = game.teams.reduce((acc, team) => {
    if (acc && team.tricks > acc.tricks) {
      acc = team;
    }
    return acc;
  });

  console.log("Winner's ID", winningTeam.id)
  console.log(round.makers.id, winningTeam.id === round.makers.id);
  console.log(round.defenders.id, winningTeam.id === round.defenders.id);

  //TODO: add feature - going alone
  if (winningTeam.alone) {
    if (winningTeam.tricks === 5) {
      winningTeam.points += 4;
    } else {
      winningTeam.points += 1;
    }
  } else if (winningTeam.id === round.makers.id) {
    if (winningTeam.tricks === 5) {
      winningTeam.points += 2;
    } else {
      winningTeam.points += 1;
    }
  } else if(winningTeam.id === round.defenders.id) {
    winningTeam.points += 2;
  }

  console.log(`${game.teams[0].players[0].name} and ${game.teams[0].players[1].name} points: ${game.teams[0].points}`)
  console.log(`${game.teams[1].players[0].name} and ${game.teams[1].players[1].name} points: ${game.teams[1].points}`)

  game.players.map(player => player.tricks = 0);
  game.teams.map(team => team.tricks = 0)

  game.inProgress = !game.hasWinner();
}
prompt("Game End.");