const defaultDeck = require("../resources/defaultDeck");
const deckTranslations = require("../resources/deckTranslations");

const Deck = function() {
  this.shuffle = shuffle;
  this.translateCard = translateCard;

  this.cards = this.shuffle();

  this.drawCard = () => {
    const cardDrawn = this.cards[0];
    //this could be refactored to take in the array index for better performance??
    this.cards.shift();

    return cardDrawn;
  }
}

// Source: https://bost.ocks.org/mike/shuffle/
//Shuffle resets the deck unless deck arg is specified
const shuffle = (deck = defaultDeck) => {
  var copy = [], n = deck.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);

    // And move it to the new array.
    copy.push(deck.splice(i, 1)[0]);
  }

  this.cards = copy;
  return copy;
};

const translateCard = cardCode => deckTranslations[cardCode];

module.exports = Deck;