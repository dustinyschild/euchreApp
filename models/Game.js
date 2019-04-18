const prompt = require("syncprompt");
const evalLookup = require("../resources/evalLookup");

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

Game.prototype.evaluateStack = function(stack) {
  //look for trump cards
  const hasTrump = stack.filter(card => deck.translateCard(card).suit === this.trumpSuit) > 0;

  if (hasTrump) {
    //set eval rank order
    let evalMap = null;
    switch (trumpSuit) {
      case "Spades":
        evalMap = evalLookup.trumpIsSpades;
      case "Clubs":
        evalMap = evalLookup.trumpIsClubs;
      case "Hearts":
        evalMap = evalLookup.trumpIsHearts;
      case "Diamonds":
        evalMap = evalLookup.trumpIsDiamonds;
    }

  } else {
    const firstCardPlayed = deck.translateCard(stack[stack.length - 1])
    switch (firstCardPlayed.suit) {
      case "Spades":
      evalMap = evalLookup.leadIsSpades;
      case "Clubs":
      evalMap = evalLookup.leadIsClubs;
      case "Hearts":
      evalMap = evalLookup.leadIsHearts;
      case "Diamonds":
      evalMap = evalLookup.leadIsDiamonds;
    }
  }

  //compare cross referenced index from eval map. Lowest index (highest rank) wins.
  return stack.reduce((acc, card) => {
    const index = evalMap.indexOf(card)
    if (index < acc) {
      acc = index;
    }

    return acc;
  });
}

module.exports = Game