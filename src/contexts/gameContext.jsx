import { createContext, useContext, useReducer } from "react";
import React from "react";

export const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

const initialState = {
  cardsData: [],
  firstCard: null,
  secondCard: null,
  lockBoard: false,
  currentPlayer: {name: "van Damme", id: 1},
  arrOfPlayers: [{name: "van Damme", id: 1}, {name: "Madonna", id: 2}],
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