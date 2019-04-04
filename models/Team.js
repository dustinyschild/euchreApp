const Team = function(...players) {
  if (players.length !== 2)
    throw Error("Player count incorrect");

  this.name = null
  this.players = [ ...players ];
  this.tricks = 0;
}

module.exports = Team;