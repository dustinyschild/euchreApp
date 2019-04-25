const Player = require("../../models/Player");

const SPADES = "Spades";
const CLUBS = "Clubs";
const HEARTS = "Hearts";
const DIAMONDS = "Diamonds";
const RED = "Red";
const BLACK = "Black";
const player1 = new Player("Player1");
const player2 = new Player("Player2");
const player3 = new Player("Player3");
const player4 = new Player("Player4");

const evalCases = [
  {
    description: "should evaluate Jack of Spades as highest card",
    stack: [
      { card: "JS", player: player1 },
      { card: "AC", player: player2 },
      { card: "QH", player: player3 },
      { card: "10D", player: player4 }
    ],
    trumpSuit: { suit: SPADES, color: BLACK},
    expected: "JS"
  },
  {
    description: "should recognize left bower as trump",
    stack: [
      { card: "JC", player: player1 },
      { card: "AH", player: player2 },
      { card: "QD", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: SPADES, color: BLACK},
    expected: "JC"
  },
  {
    description: "should recognize left bower as trump (not first card played)",
    stack: [
      { card: "AH", player: player1 },
      { card: "JC", player: player2 },
      { card: "QD", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: SPADES, color: BLACK},
    expected: "JC"
  },
  {
    description: "should default trump suit as the suit that lead if no trump was played",
    stack: [
      { card: "JH", player: player1 },
      { card: "AC", player: player2 },
      { card: "QH", player: player3 },
      { card: "10D", player: player4 }
    ],
    trumpSuit: { suit: SPADES, color: BLACK},
    expected: "QH"
  },
  {
    description: "should evaluate Jack of Clubs as highest card",
    stack: [
      { card: "JC", player: player1 },
      { card: "AC", player: player2 },
      { card: "QH", player: player3 },
      { card: "10D", player: player4 }
    ],
    trumpSuit: { suit: CLUBS, color: BLACK},
    expected: "JC"
  },
  {
    description: "should recognize left bower as trump",
    stack: [
      { card: "JS", player: player1 },
      { card: "AH", player: player2 },
      { card: "QD", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: CLUBS, color: BLACK},
    expected: "JS"
  },
  {
    description: "should recognize left bower as trump (not first card played)",
    stack: [
      { card: "AH", player: player1 },
      { card: "JS", player: player2 },
      { card: "QD", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: CLUBS, color: BLACK},
    expected: "JS"
  },
  {
    description: "should default trump suit as the suit that lead if no trump was played",
    stack: [
      { card: "JH", player: player1 },
      { card: "AS", player: player2 },
      { card: "QH", player: player3 },
      { card: "10D", player: player4 }
    ],
    trumpSuit: { suit: CLUBS, color: BLACK},
    expected: "QH"
  },
  {
    description: "should evaluate Jack of Hearts as highest card",
    stack: [
      { card: "JH", player: player1 },
      { card: "AC", player: player2 },
      { card: "QH", player: player3 },
      { card: "10D", player: player4 }
    ],
    trumpSuit: { suit: HEARTS, color: RED},
    expected: "JH"
  },
  {
    description: "should recognize left bower as trump",
    stack: [
      { card: "JD", player: player1 },
      { card: "AH", player: player2 },
      { card: "QD", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: HEARTS, color: RED},
    expected: "JD"
  },
  {
    description: "should recognize left bower as trump (not first card played)",
    stack: [
      { card: "AH", player: player1 },
      { card: "JD", player: player2 },
      { card: "QD", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: HEARTS, color: RED},
    expected: "JD"
  },
  {
    description: "should default trump suit as the suit that lead if no trump was played",
    stack: [
      { card: "JS", player: player1 },
      { card: "AS", player: player2 },
      { card: "QS", player: player3 },
      { card: "10D", player: player4 }
    ],
    trumpSuit: { suit: HEARTS, color: RED},
    expected: "AS"
  },
  {
    description: "should evaluate Jack of Diamonds as highest card",
    stack: [
      { card: "JD", player: player1 },
      { card: "AC", player: player2 },
      { card: "QH", player: player3 },
      { card: "10D", player: player4 }
    ],
    trumpSuit: { suit: DIAMONDS, color: RED},
    expected: "JD"
  },
  {
    description: "should recognize left bower as trump",
    stack: [
      { card: "JH", player: player1 },
      { card: "AH", player: player2 },
      { card: "QD", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: DIAMONDS, color: RED},
    expected: "JH"
  },
  {
    description: "should recognize left bower as trump (not first card played)",
    stack: [
      { card: "AH", player: player1 },
      { card: "JH", player: player2 },
      { card: "QD", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: DIAMONDS, color: RED},
    expected: "JH"
  },
  {
    description: "should default trump suit as the suit that lead if no trump was played",
    stack: [
      { card: "JS", player: player1 },
      { card: "AS", player: player2 },
      { card: "QS", player: player3 },
      { card: "10H", player: player4 }
    ],
    trumpSuit: { suit: DIAMONDS, color: RED},
    expected: "AS"
  }
];

module.exports = {
  evalCases
}