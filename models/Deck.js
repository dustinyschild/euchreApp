const defaultDeck = require("../resources/defaultDeck");
const deckTranslations = require("../resources/deckTranslations");

const Deck = function() {
  this.cards = defaultDeck.slice(0); //COPY OF DECK MODEL

  this.drawCard = () => {
    if (this.cards.length === 0)
      throw Error("No cards left");

    const cardDrawn = this.cards[0];
    //this could be refactored to take in the array index for better performance??
    this.cards.shift();

    return cardDrawn;
  }

  // Source: https://bost.ocks.org/mike/shuffle/
  //Shuffle resets the deck unless deck arg is specified
  this.shuffle = (deck = defaultDeck) => {
    //ADDED: clone deck to preserve the original
    deckCopy = deck.slice(0);
    var newDeck = [], n = deckCopy.length, i;

    // While there remain elements to shuffle…
    while (n) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * n--);

      // And move it to the new array.
      newDeck.push(deckCopy.splice(i, 1)[0]);
    }

    this.cards = newDeck;
    return newDeck;
  };
}


Deck.prototype.translateCard = cardCode => deckTranslations[cardCode];

module.exports = Deck;