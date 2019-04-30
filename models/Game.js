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

Game.prototype.playCard = function(card, player) {
  this.stack.push({card, player});
}

Game.prototype.evaluateStack = function(stack) {
  //look for trump cards
  const hasTrump = stack.filter(cardPlayerPair => {
    const card = this.deck.translateCard(cardPlayerPair.card);
    const matchesSuit = card.suit === this.trumpSuit.suit;
    const isLeftBower = card.rank === "Jack" && card.color === this.trumpSuit.color;

    return matchesSuit || isLeftBower;
  }).length > 0;

  //set rank order
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
    const firstCardPlayed = this.deck.translateCard(stack[0].card);

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

  //compare cross referenced index from eval map. Lowest index (highest rank) wins.
  return stack.reduce((acc, cardPlayerPair) => {
    const { card } = cardPlayerPair;

    const index = evalMap.indexOf(card);
    if (index < acc.index && index >= 0) {
      acc = { card: card, player: cardPlayerPair.player, index: index };
    }

    return acc;
  }, {index: 32});
}

module.exports = Game;