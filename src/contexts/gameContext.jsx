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
  player: {},
  cardsData: [],
  firstCard: null,
  secondCard: null,
  lockBoard: false,
  currentPlayerIndex: 0,
  arrOfPlayers: [],
  gameState: GameStates.GAME_OVER,
  messages: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CARDS_DATA':
      return { ...state, cardsData: action.payload };
    case 'SET_FIRST_CARD':
      return { ...state, firstCard: action.payload };
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
    case 'SET_PLAYER':
      return { ...state, player: action.payload };
    case 'SET_PLAYERS':
      return { ...state, arrOfPlayers: action.payload };
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