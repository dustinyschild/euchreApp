const prompt = require("syncprompt");

const Game = function(deck, ...players) {
  this.inProgress = true;
  this.currentRound = null;
  this.players = [
    ...players
  ]

  this.teams = [];

  this.assignDealer = () => {
    console.log(deck.cards);
    let card = deck.drawCard();
    console.log(card);
    let i = 0

    card = "KH";
    do  {
      console.log(`${this.players[i%4].name} draws ${deck.translateCard(card)}`);

      i++;
      prompt();
    } while (!card.includes("J"));
  }
}

module.exports = Game