const prompt = require("syncprompt");

const Game = function(deck, ...players) {
  this.inProgress = true;
  this.players = [
    ...players
  ]

  this.currentRound = null;
  this.activePlayer = null;

  this.teams = [];
  this.dealer = null;

  this.setActivePlayer = player => this.activePlayer = player;

  this.getNextPlayer = currentPlayer => {
    const nextPlayer = this.players.reduce((acc, player, i) => {
      if (player.name === currentPlayer.name) {
        console.log("NEXT PLAYER INDEX", (i + 1)%4, this.players[(i + 1)%4])
        return this.players[(i + 1)%4];
      }

      return acc;
    }, null);
    console.log(nextPlayer)
    this.activePlayer = nextPlayer;
    //this.setActivePlayer(nextPlayer);
    return nextPlayer;
  }


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
}

module.exports = Game