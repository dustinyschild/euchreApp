# euchreApp
building for fun!

## How to play
Euchre is a card game played by 2 teams of 2 players each. Teams compete to win tricks. The team that takes the most tricks wins the round and is rewarded with points. First team to 15 number of points wins.

### Taking tricks
Players win tricks by playing the highest card.

### Mechanics
Each player is delt 5 cards and 1 card is flipped from the top of the deck. Starting from the left of the dealer, blah blah blah...

## MVP
1. Deal cards
2. Shuffle cards
3. Play cards
4. Win tricks
5. Score Points
6. End the game

### Additional features
- Host on server
- UI App
  - Persistence & Login
  - Stats tracking
  - Chat
- Scale to tournament/rank system
- Third party OAuth (Facebook, Goolge, etc.)

### Models
- Deck
- Game
- Player
- Team?

#To Do/Backlog
- Refactor factory methods to prototypes (don't use arrow functions!)
- ***INTRODUCE TESTING***

1. Finish core logic
2. Decouple user actions from core game and create client (This will be a step towards scaling the app).
3. Allow for client usage across network (using socket.io?) - validate and call the actions created in step 2
4. Database to persist users, games, game actions, etc.