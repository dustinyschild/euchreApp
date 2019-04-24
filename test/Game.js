const assert = require("assert").strict;
const itParam = require("mocha-param");

const Deck = require("../models/Deck");
const Game = require("../models/Game");

describe("Game", function() {
  const deck = new Deck();
  const sut = new Game(deck);
  //Start as pending and will figure out how to write them after
  it("should last 5 Rounds");

  it("should be able to assign a dealer");

  //these first few would probably be assertions on a single test run though of the app
  it("should register players");

  describe(".evaluateStack()", function() {
    const SPADES = "Spades";
    const CLUBS = "Clubs";
    const HEARTS = "Hearts";
    const DIAMONDS = "Diamonds";
    const RED = "Red";
    const BLACK = "Black";

    const testCases = [
      {
        description: "should evaluate Jack of Spades as highest card",
        stack: ["JS", "AC", "QH", "10D"],
        trumpSuit: { suit: SPADES, color: BLACK},
        expected: "JS"
      },
      {
        description: "should recognize left bower as trump",
        stack: ["JC", "AH", "QD", "10H"],
        trumpSuit: { suit: SPADES, color: BLACK},
        expected: "JC"
      },
      {
        description: "should recognize left bower as trump (not first card played)",
        stack: ["AH", "JC", "QD", "10H"],
        trumpSuit: { suit: SPADES, color: BLACK},
        expected: "JC"
      },
      {
        description: "should default winning suit as the suit that lead if no trump was played",
        stack: ["JH", "AC", "QH", "10D"],
        trumpSuit: { suit: SPADES, color: BLACK},
        expected: "QH"
      },
    ];

    itParam("${value.description}", testCases, function(testCase) {
      sut.trumpSuit = testCase.trumpSuit;

      const highCard = sut.evaluateStack(testCase.stack);

      assert.strictEqual(highCard, testCase.expected);
    });
  });
});