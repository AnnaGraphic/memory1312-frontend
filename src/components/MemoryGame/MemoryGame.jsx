import './MemoryGame.css';
import { useEffect } from 'react';
import MemoryCard from '../MemoryCard/MemoryCard';
import RoomSelector from '../RoomSelector/RoomSelector';
import { useGameContext } from '../../contexts/gameContext';
import { socket } from '../../socket.js';
import { useGameLogic } from '../../hooks/useGameLogic';
import { checkForMatch } from '../../utils/checkForMatch.js';

function MemoryGame() {
  const { state, dispatch } = useGameContext();

  // ------ hooks ------
  useGameLogic(state, dispatch);

  useEffect(() => {
    checkForMatch(state, dispatch);
    resetCards();
    // check for game over
    if (allCardsFlipped()) {
      setTimeout(() => {
        socket.emit('end game');
      }, 800);
    }
  }, [state.secondCard]);

  const resetCards = () => {
    dispatch({ type: 'SET_FIRST_CARD', payload: null });
    dispatch({ type: 'SET_SECOND_CARD', payload: null });
  };

  const handleCardClick = (card) => {
    if (state.lockBoard) return;
    if (!state.firstCard) {
      socket.emit('set first card', card);
      //console.log('firstCard: ', state.firstCard);
    } else if (!state.secondCard) {
      socket.emit('set second card', card);
    }
    socket.emit('flip card', card.id);
  };

  const allCardsFlipped = () => {
    //return state.cardsData.every(card => card.isFlipped);
    console.log(state.cardsData.every(card => card.isFlipped));
  };

  return (
      <div className="container">
        <h1>memory 1312</h1>
        <h2>player <strong>{state.arrOfPlayers[state.currentPlayerIndex].name}'s</strong> turn</h2>
        {state.selectedRoom !== '' && (
          <h3>room: {state.selectedRoom}</h3>
        )}
        {state.gameState === 'GAME_OVER' && (
          <>
            <h2>Game Over</h2>
            <RoomSelector />
          </>
          )}
        {state.gameState === 'PLAYING' && (
        <section className="board">
          {state.cardsData.map((card, id) => (
            <MemoryCard
              card={card}
              key={id}
              name={card.name}
              image={card.image}
              isFlipped={card.isFlipped}
              onClick={handleCardClick}
            />
          ))}
        </section>
      )}
    </div>
  );
  }

  export default MemoryGame;
