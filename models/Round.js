const Round = function() {
  this.inProgress = true;
  this.trumpSuit = null;

  this.handsPlayed = [];

  this.totalTricks = 0;
}

module.exports = Round;