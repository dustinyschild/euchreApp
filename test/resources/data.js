const SPADES = "Spades";
const CLUBS = "Clubs";
const HEARTS = "Hearts";
const DIAMONDS = "Diamonds";
const RED = "Red";
const BLACK = "Black";


const evalCases = [
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
    description: "should default trump suit as the suit that lead if no trump was played",
    stack: ["JH", "AC", "QH", "10D"],
    trumpSuit: { suit: SPADES, color: BLACK},
    expected: "QH"
  },
  {
    description: "should evaluate Jack of Clubs as highest card",
    stack: ["JC", "AC", "QH", "10D"],
    trumpSuit: { suit: CLUBS, color: BLACK},
    expected: "JC"
  },
  {
    description: "should recognize left bower as trump",
    stack: ["JS", "AH", "QD", "10H"],
    trumpSuit: { suit: CLUBS, color: BLACK},
    expected: "JS"
  },
  {
    description: "should recognize left bower as trump (not first card played)",
    stack: ["AH", "JS", "QD", "10H"],
    trumpSuit: { suit: CLUBS, color: BLACK},
    expected: "JS"
  },
  {
    description: "should default trump suit as the suit that lead if no trump was played",
    stack: ["JH", "AS", "QH", "10D"],
    trumpSuit: { suit: CLUBS, color: BLACK},
    expected: "QH"
  },
  {
    description: "should evaluate Jack of Hearts as highest card",
    stack: ["JH", "AC", "QH", "10D"],
    trumpSuit: { suit: HEARTS, color: RED},
    expected: "JH"
  },
  {
    description: "should recognize left bower as trump",
    stack: ["JD", "AH", "QD", "10H"],
    trumpSuit: { suit: HEARTS, color: RED},
    expected: "JD"
  },
  {
    description: "should recognize left bower as trump (not first card played)",
    stack: ["AH", "JD", "QD", "10H"],
    trumpSuit: { suit: HEARTS, color: RED},
    expected: "JD"
  },
  {
    description: "should default trump suit as the suit that lead if no trump was played",
    stack: ["JS", "AS", "QS", "10D"],
    trumpSuit: { suit: HEARTS, color: RED},
    expected: "AS"
  },
  {
    description: "should evaluate Jack of Diamonds as highest card",
    stack: ["JD", "AC", "QH", "10D"],
    trumpSuit: { suit: DIAMONDS, color: RED},
    expected: "JD"
  },
  {
    description: "should recognize left bower as trump",
    stack: ["JH", "AH", "QD", "10H"],
    trumpSuit: { suit: DIAMONDS, color: RED},
    expected: "JH"
  },
  {
    description: "should recognize left bower as trump (not first card played)",
    stack: ["AH", "JH", "QD", "10H"],
    trumpSuit: { suit: DIAMONDS, color: RED},
    expected: "JH"
  },
  {
    description: "should default trump suit as the suit that lead if no trump was played",
    stack: ["JS", "AS", "QS", "10H"],
    trumpSuit: { suit: DIAMONDS, color: RED},
    expected: "AS"
  }
];

module.exports = {
  evalCases
}