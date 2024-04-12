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
        dispatch({ type: 'END_GAME' });
      }, 800);
    }
  }, [state.cardsData]);

  function shuffleArray(array) {
    let idCounter = 0;
    // double cards to get pairs
    const pairsArray = array.flatMap(card => [{ ...card, id: idCounter++ }, { ...card, id: idCounter++ }]);
    for (let i = pairsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairsArray[i], pairsArray[j]] = [pairsArray[j], pairsArray[i]];
    }
    return pairsArray;
  const resetCards = () => {
    dispatch({ type: 'SET_FIRST_CARD', payload: null });
    dispatch({ type: 'SET_SECOND_CARD', payload: null });
  };

  };

  const handleCardClick = (card) => {
    if (state.lockBoard) return;
    if (!state.firstCard) {
      dispatch({ type: 'SET_FIRST_CARD', payload: card });
      console.log('firstCard: ', state.firstCard);
    } else if (!state.secondCard) {
      dispatch({ type: 'SET_SECOND_CARD', payload: card });
      dispatch({ type: 'SWITCH_PLAYER' });
      dispatch({ type: 'LOCK_BOARD', payload: true });
      // moved to useEffect to update state:
      //checkForMatch();
    }
    dispatch({ type: 'FLIP_CARD', payload: card.id });
  };

  const handleStart = () => {
    dispatch({ type: 'START_GAME' });
    console.log('start game');
  };

  const allCardsFlipped = () => {
    return state.cardsData.every(card => card.isFlipped);
  };

  return (
      <div className="container">
        <h1>memory 1312</h1>
        <h2>player <strong>{state.arrOfPlayers[state.currentPlayerIndex].name}'s</strong> turn</h2>
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
