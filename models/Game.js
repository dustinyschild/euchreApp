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
  const hasTrump = stack.filter(card => {
    stackCard = this.deck.translateCard(card)
    console.log(this.trumpSuit)
    const matchesSuit = stackCard.suit === this.trumpSuit.suit;
    const isLeftBower = stackCard.rank === "Jack" && stackCard.color === this.trumpSuit.color;

    return matchesSuit || isLeftBower;
  }).length > 0;

  console.log("hasTrump", hasTrump);

  //set eval rank order
  let evalMap = null;
  const { suit } = this.trumpSuit;
  if (hasTrump) {
    if (suit === "Spades")
      evalMap = evalLookup.trumpIsSpades;
    else if (suit === "Clubs")
      evalMap = evalLookup.trumpIsClubs;
    else if (suit === "Hearts")
      evalMap = evalLookup.trumpIsHearts;
    else if (suit === "Diamonds")
      evalMap = evalLookup.trumpIsDiamonds;
    else
      throw new Error("EvalMap must be set");
  } else {
    const firstCardPlayed = this.deck.translateCard(stack[0]);

    if (firstCardPlayed.suit === "Spades")
      evalMap = evalLookup.leadIsSpades;
    else if (firstCardPlayed.suit === "Clubs")
      evalMap = evalLookup.leadIsClubs;
    else if (firstCardPlayed.suit === "Hearts")
      evalMap = evalLookup.leadIsHearts;
    else if (firstCardPlayed.suit === "Diamonds")
      evalMap = evalLookup.leadIsDiamonds;
    else
      throw new Error("EvalMap must be set.");
  }

  console.log("start reduce")
  //compare cross referenced index from eval map. Lowest index (highest rank) wins.
  const indexOfHighCard = stack.reduce((acc, card) => {
    const index = evalMap.indexOf(card);
    console.log(card, index, acc);
    if (index < acc && index >= 0) {
      acc = index;
    }
    return acc;
  }, 32); //Default value for index

  console.log(evalMap[indexOfHighCard]);
  return evalMap[indexOfHighCard];
}

module.exports = Game