const Player = function(name) {
  this.name = name;
  this.hand = [];

  //TEMPORARY
  this.mocks = {};
}

Player.prototype.playCard = function(card) {
  this.hand = this.hand.filter(cardFromHand => cardFromHand !== card);
}

module.exports = Player;