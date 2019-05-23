const uuid = require("uuid/v4");

const Team = function(...players) {
  this.id = uuid();
  console.log(this.id);
  if (players.length !== 2)
    throw Error("Player count incorrect");

  this.name = null
  this.players = [ ...players ];
  this.tricks = 0;
  this.points = 0;
}

module.exports = Team;