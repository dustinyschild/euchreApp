const assert = require("assert").strict;
const defaultDeck = require("../resources/defaultDeck");
const Deck = require("../models/Deck");

describe("Deck", function() {
  const sut = new Deck();

  describe("should be able to draw card", function() {
    afterEach(function() {
      sut.cards = defaultDeck.slice(0);
    });

    it("when there are cards in the deck", function() {
      const original = sut.cards.slice(0);
      const card = sut.drawCard();

      assert.strictEqual(card, original[0]);
      assert.strictEqual(sut.cards[0], original[1]);
    });
  });
});