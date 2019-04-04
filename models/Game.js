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
    let i = 0

    do  {
      card = deck.drawCard();
      console.log(`${this.players[i%4].name} draws ${deck.translateCard(card)}`);
      i++;
      prompt("Next");
    } while (!card.includes("J"));

    this.dealer = this.players[i%4].name
    return this.dealer;
  }
}

module.exports = Game