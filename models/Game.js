const prompt = require("syncprompt");

const Game = function(deck, ...players) {
  this.inProgress = true;
  this.players = [
    ...players
  ]

  this.currentRound = null;
  this.activePlayer = null;
  this.trumpSuit = null;

  this.teams = [];
  this.dealer = null;

  this.stack = [];

  this.setActivePlayer = player => this.activePlayer = player;

  this.getNextPlayer = currentPlayer =>
    this.players.reduce((acc, player, i) =>
      player.name === currentPlayer.name ? this.players[(i + 1)%4] : acc,
      null
    );


  this.assignDealer = () => {
    let card = null;
    let playerDrawing = null;
    let i = 0;

    do  {
      card = deck.drawCard();
      playerDrawing = this.players[i%4];
      playerCard = deck.translateCard(card)
      console.log(`${playerDrawing.name} draws ${playerCard.rank} of ${playerCard.suit}`);
      i++;
      prompt("Next");
    } while (!card.includes("J"));

    this.dealer = playerDrawing;
    return this.dealer.name;
  };

  this.shuffleAndDealCards = () => {
    deck.shuffle();

    console.log("Shuffled", deck, deck.cards.length);
  };

  //TEMPORARY
  this.mocks = {};
}

Game.prototype.playCard = function(card) {
  this.stack.push(card);
}

module.exports = Game