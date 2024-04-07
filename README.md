# memory 1312
## project description:
  multiplayer game - 2-? players playing memory
  when a pair is flipped correctly, all players are shown a text on their device that is specifically assigned to that pair.the flipping player's score is increased by one. when all cards are revealed, the game is over and the scores are displayed.

## project outline
  - socket.io is used to connect clients with the node server
  - when a client connects to the server, a player with same id like the unique socket id is registered
  - game state will emmited to all clients
  - server listens for player moves

## technologies
  node.js, express, socket.io, git

## CRUD operations
  create new game: create
  get current game stat: retrive
  flip cards: update
  quit game: delete

## TODOs:
### answer questions:
  - [] how/when does the game start
  - [] how (often) gamestate will be emmitted to players
  - [] how/where to deploy
  - [] centralised game logic: should the shuffling of cards, checking matches and determining the winner happen on the server?
  - [] how to join?
  - [] what to show?
    - [] usernames and scores?
    - [] cards!
    - [] time?
### frontend
    - [] reuse / clone an existing frontend i.o. to save time
### databases
    - [] mongoDB / postgres?
    - [] table for cards
        - frontpic
        - text/story shown after players found match
        - additional: bundesland?
    - [] table for players
        - id
        - name
        - score