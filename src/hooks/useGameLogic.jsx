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

    socket.on('set first card', (card) => {
      console.log(card.imgageUrl);
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
};