const Game = function(...players) {
  this.inProgress = true;
  this.players = [
    ...players
  ]

  this.team1 = {
    name: null,
    members: [
      this.players[0],
      this.players[1]
    ],
    points: 0,
    tricks: 0
  }

  this.team2 = {
    name: null,
    members: [
      this.players[2],
      this.players[3]
    ],
    points: 0,
    tricks: 0
  }
}

module.exports = Game