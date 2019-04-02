const defaultDeck = require("../resources/defaultDeck")

const Deck = function() {
  this.shuffle = shuffle;
  this.drawCard = drawCard;
  this.translateCard = translateCard;

  this.cards = this.shuffle();
}

// Pulled from: https://bost.ocks.org/mike/shuffle/
//Shuffling efficiency of O(n) :))
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

//TODO: implement methods
const drawCard = () => new Error("Error: not implemented");

const translateCard = () => new Error("Error: not implemented");

module.exports = Deck;