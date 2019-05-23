const Round = function() {
  this.inProgress = true;
  this.trumpSuit = null;

  this.handsPlayed = [];

  this.totalTricks = 0;

  this.makers = null;
  this.defenders = null;
}

module.exports = Round;