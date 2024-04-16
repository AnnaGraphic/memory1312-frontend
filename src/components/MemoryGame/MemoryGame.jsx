import './MemoryGame.css';
import { useEffect } from 'react';
import MemoryCard from '../MemoryCard/MemoryCard';
import { useGameContext } from '../../contexts/gameContext';
import { Button } from '../Button/SubmitButton';
import { socket } from '../../socket.js';
import { useGameLogic } from '../../hooks/useGameLogic';
import { checkForMatch } from '../../utils/checkForMatch.js';

function MemoryGame() {
  const { state, dispatch } = useGameContext();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // ------ hooks ------
  useGameLogic(state, dispatch);

  useEffect(() => {
    const fetchInitialCardsData = async () => {
      try {
        const response = await fetch(`${baseUrl}/cards`);
        if (!response.ok) {
          throw new Error(`Failed to fetch cards: ${response.status} - ${response.statusText}`);
        }
        const cardsData = await response.json();
        dispatch({ type: 'SET_CARDS_DATA', payload: shuffleArray(cardsData) });
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialCardsData();
  }, []);

  useEffect(() => {
    checkForMatch(state, dispatch);
    resetCards();
  }, [state.secondCard]);

  useEffect(() => {
    //TODO: find performance-optimized approach for detect game over
    if (allCardsFlipped()) {
      setTimeout(() => {
        socket.emit('end game');
      }, 800);
    }
  }, [state.cardsData]);

  const resetCards = () => {
    dispatch({ type: 'SET_FIRST_CARD', payload: null });
    dispatch({ type: 'SET_SECOND_CARD', payload: null });
  };

 function shuffleArray(array) {
    let idCounter = 0;
    // double cards to get pairs
    const pairsArray = array.flatMap(card => [{ ...card, id: idCounter++ }, { ...card, id: idCounter++ }]);
    for (let i = pairsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairsArray[i], pairsArray[j]] = [pairsArray[j], pairsArray[i]];
    }
    return pairsArray;
  };

  const handleCardClick = (card) => {
    if (state.lockBoard) return;
    if (!state.firstCard) {
      socket.emit('set first card', card);
      console.log('firstCard: ', state.firstCard);
    } else if (!state.secondCard) {
      socket.emit('set second card', card);
    }
    socket.emit('flip card', card.id);
  };

  const handleStart = () => {
    if (state.cardsData.length === 0) {
      // TODO: error handling
      console.log("no cards data");
    }
    console.log('start game');
    socket.emit('start game', state.cardsData)
  };

  const allCardsFlipped = () => {
    return state.cardsData.every(card => card.isFlipped);
  };

  return (
     <>
        <div className="container">
          <h1>memory 1312</h1>
          {state.gameState !== 'GAME_OVER' && (<h2>player <strong>{state.arrOfPlayers[state.currentPlayerIndex].name}'s</strong> turn</h2>)}
          {state.gameState === 'GAME_OVER' && (
            <>
              <h2>Game Over</h2>
              <Button
                onClick={handleStart}
                text="Start Game"
                >
              </Button>
            </>
            )}
          {state.gameState === 'PLAYING' && (
          <section className="board">
            {state.cardsData.map((card, id) => (
              <MemoryCard
                card={card}
                key={id}
                name={card.name}
                imageUrl={card.imageUrl}
                isFlipped={card.isFlipped}
                onClick={handleCardClick}
              />
            ))}
          </section>
        )}
    `  </div>
    </>
  );
  }

  export default MemoryGame;
