const Player = function(name) {
  this.name = name;
  this.hand = [];

  this.tricks = 0;

  //TEMPORARY
  this.mocks = {};
}

Player.prototype.playCard = function(card) {
  this.hand = this.hand.filter(cardFromHand => cardFromHand !== card);
}

module.exports = Player;