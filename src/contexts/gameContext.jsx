import { createContext, useContext, useReducer } from "react";
import React from "react";

export const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

const GameStates = {
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER',
};

const initialState = {
  playersName: {'player': 'ffffff'},
  cardsData: [],
  firstCard: null,
  secondCard: null,
  lockBoard: false,
  currentPlayerIndex: 0,
  arrOfPlayers: [{name: "van Damme", id: 1}, {name: "Madonna", id: 2}],
  gameState: GameStates.GAME_OVER,
  messages: [],
  selectedRoom: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CARDS_DATA':
      return { ...state, cardsData: action.payload };
    case 'SET_FIRST_CARD':
      return { ...state, firstCard: action.payload };
    case 'SET_PLAYERS_NAME':
      return { ...state, playersName: action.payload };
    case 'SET_ROOM':
      return { ...state, selectedRoom: action.payload };
    case 'SET_SECOND_CARD':
      return { ...state, secondCard: action.payload };
    case 'LOCK_BOARD':
      return { ...state, lockBoard: action.payload };
    case 'FLIP_CARD':
      return {
        ...state,
        cardsData: state.cardsData.map(card =>
          card.id === action.payload ? { ...card, isFlipped: !card.isFlipped } : card
        )
      };
    case 'UNFLIP_CARDS':
      return {
        ...state,
        cardsData: state.cardsData.map(card =>
          action.payload.includes(card.id) ? { ...card, isFlipped: false } : card
        )
      };
    case 'SWITCH_PLAYER':
      return {
        ...state,
        currentPlayerIndex: state.currentPlayerIndex === 0 ? 1 : 0
      };
    case 'START_GAME':
      return { ...state, gameState: GameStates.PLAYING };
    case 'END_GAME':
      return { ...state, gameState: GameStates.GAME_OVER };
    case 'NEW_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
}
  
export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}