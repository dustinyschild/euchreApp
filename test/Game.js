const assert = require("assert").strict;
const itParam = require("mocha-param");

const Deck = require("../models/Deck");
const Game = require("../models/Game");

const data = require("./resources/data");

describe("Game", function() {
  const deck = new Deck();
  const sut = new Game(deck);
  //Start as pending and will figure out how to write them after
  it("should last 5 Rounds");

  it("should be able to assign a dealer");

  //these first few would probably be assertions on a single test run though of the app
  it("should register players");

  describe(".evaluateStack()", function() {
    const { evalCases } = data;

    itParam("${value.description}", evalCases, function(evalCase) {
      sut.trumpSuit = evalCase.trumpSuit;

      const highCard = sut.evaluateStack(evalCase.stack);

      assert.strictEqual(highCard, evalCase.expected);
    });
  });
});