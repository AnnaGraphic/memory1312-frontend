import { useEffect } from 'react';
import { socket } from '../socket';

export const useGameLogic = (state, dispatch) => {
  useEffect(() => {

     socket.on('card flipped', (cardId) => {
      console.log('card flipped');
      dispatch({ type: 'FLIP_CARD', payload: cardId});
    })

    socket.on('game ended', () => {
      dispatch({ type: 'END_GAME' });
    });

    socket.on('game started', (cardsData) => {
      console.log('game started');
      dispatch({ type: 'SET_CARDS_DATA', payload: cardsData });
      dispatch({ type: 'START_GAME' });
    });

    socket.on('room created', (room, shuffledCardsData, playersName) => {
      //console.log('room created', shuffledCardsData);
      dispatch({ type: 'SET_CARDS_DATA', payload: shuffledCardsData });
      dispatch({ type: 'SET_ROOM', payload: room});
      dispatch({ type: 'SET_PLAYERSNAME', payload: playersName });
      console.log('playersName', playersName);
      dispatch({ type: 'START_GAME' });
    });

    socket.on('room joined', (room) =>{
      console.log('room joined');
      dispatch({ type: 'SET_ROOM', payload: room});
    });

    socket.on('set first card', (card) => {
      console.log(card.name);
      dispatch({ type: 'SET_FIRST_CARD', payload: card });
    });

    socket.on('set second card', (card) => {
      console.log('socket on 2nd card: ', card.name)
      dispatch({ type: 'SET_SECOND_CARD', payload: card });
      dispatch({ type: 'SWITCH_PLAYER' });
      dispatch({ type: 'LOCK_BOARD', payload: true });
    });

    return () => {
      socket.off('card flipped');
      socket.off('game ended');
      socket.off('game started');
      socket.off('set first card');
      socket.off('set second card');
    };
  }, [dispatch]);
  return 
};