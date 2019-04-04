const Round = function() {
  this.inProgress = true;
  this.trumpSuit = null;

  this.dealer = null;

  this.handsPlayed = [];
}

module.exports = Round;