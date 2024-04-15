# memory 1312 -- frontend
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
  - [] what to show?
    - [] joined players
    - [] usernames and scores?
    - [] cards!
    - [] time?
    - [x] joined room
  - [] find logic forlet players either create or join a room
  - [x] let player create game
  - [] let players join game
  - [] chat: show names
  - [] show modal with texts in case of a match