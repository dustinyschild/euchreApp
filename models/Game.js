const prompt = require("syncprompt");

const Game = function(deck, ...players) {
  this.inProgress = true;
  this.currentRound = null;
  this.players = [
    ...players
  ]

  this.teams = [];

  this.assignDealer = () => {
    let card = null;
    let i = 0

    do  {
      card = deck.drawCard();
      console.log(`${this.players[i%4].name} draws ${card}`);
      i++;
      prompt();
    } while (!card.includes("J"));
  }
}

module.exports = Game