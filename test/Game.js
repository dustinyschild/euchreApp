const assert = require("assert");
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

  describe(" > evaluateStack", function() {
    const SPADES = "Spades";
    const CLUBS = "Clubs";
    const HEARTS = "Hearts";
    const DIAMONDS = "Diamonds";

    const testCases = [
      {
        description: "should evaluate Jack of Clubs as highest card",
        stack: ["JC", "AC", "QC", "10C"],
        trumpSuit: CLUBS,
        expected: "JC"
      }
    ];

    testCases.map(testCase => {
      sut.trumpSuit = testCase.trumpSuit;

      it(testCase.description, function() {
        
      });
    });
  });
});