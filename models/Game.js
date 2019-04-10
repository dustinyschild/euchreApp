const prompt = require("syncprompt");

const Game = function(deck, ...players) {
  this.inProgress = true;
  this.currentRound = null;
  this.players = [
    ...players
  ]

  this.teams = [];
  this.dealer = null;

  this.assignDealer = () => {
    let card = null;
    let playerDrawing = null;
    let i = 0;

    do  {
      card = deck.drawCard();
      playerDrawing = this.players[i%4];
      console.log(`${playerDrawing.name} draws ${deck.translateCard(card)}`);
      i++;
      prompt("Next");
    } while (!card.includes("J"));

    this.dealer = playerDrawing
    return this.dealer.name;
  };

  this.shuffleAndDealCards = () => {
    deck.shuffle();

    console.log("Shuffled", deck, deck.cards.length);
  };
}

module.exports = Game