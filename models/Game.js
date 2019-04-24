const prompt = require("syncprompt");
const evalLookup = require("../resources/evalLookup");

const Game = function(deck, ...players) {
  this.inProgress = true;
  this.players = [
    ...players
  ]

  this.deck = deck;

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
  console.log("EVALUATING");
  //look for trump cards
  const hasTrump = stack.filter(card => this.deck.translateCard(card).suit === this.trumpSuit).length > 0;

  console.log("hasTrump", hasTrump);

  //set eval rank order
  let evalMap = null;

  if (hasTrump) {
    if (this.trumpSuit === "Spades")
      evalMap = evalLookup.trumpIsSpades;
    else if (this.trumpSuit === "Clubs")
      evalMap = evalLookup.trumpIsClubs;
    else if (this.trumpSuit === "Hearts")
      evalMap = evalLookup.trumpIsHearts;
    else if (this.trumpSuit === "Diamonds")
      evalMap = evalLookup.trumpIsDiamonds;
  } else {
    const firstCardPlayed = this.deck.translateCard(stack[stack.length - 1]);

    if (firstCardPlayed.suit === "Spades")
      evalMap = evalLookup.leadIsSpades;
    else if (firstCardPlayed.suit === "Clubs")
      evalMap = evalLookup.leadIsClubs;
    else if (firstCardPlayed.suit === "Hearts")
      evalMap = evalLookup.leadIsHearts;
    else if (firstCardPlayed.suit === "Diamonds")
      evalMap = evalLookup.leadIsDiamonds;
  }

  console.log("trumpSuit", this.trumpSuit)
  console.log("evalMap", evalMap)
  //compare cross referenced index from eval map. Lowest index (highest rank) wins.
  const indexOfHighCard = this.stack.reduce((acc, card) => {
    const index = evalMap.indexOf(card);
    console.log("index", index, acc);
    if (index < acc && index >= 0) {
      console.log("LowestCurrent card", index)
      acc = index;
    }
    return acc;
  }, 32); //Default value for index

  return stack[indexOfHighCard];
}

module.exports = Game