import './MemoryGame.css';
import { useEffect, useReducer } from 'react';
import MemoryCard from '../MemoryCard/MemoryCard';
import { useGameContext } from '../../contexts/gameContext';
import { Button } from '../Button/SubmitButton';

const baseUrl = import.meta.env.VITE_BASE_URL;

function MemoryGame() {
  const { state, dispatch } = useGameContext();

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
    checkForMatch();
  }, [state.secondCard]);

  function shuffleArray(array) {
    let idCounter = 0;
    // double cards to get pairs
    const pairsArray = array.flatMap(card => [{ ...card, id: idCounter++ }, { ...card, id: idCounter++ }]);
    for (let i = pairsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairsArray[i], pairsArray[j]] = [pairsArray[j], pairsArray[i]];
    }
    return pairsArray;
  }

  const checkForMatch = () => {
    console.log('checkForMatch');
    const { firstCard, secondCard } = state;
    if (firstCard && secondCard) {
      console.log('firstCard: ', firstCard.name, 'secondCard: ', secondCard.name);
      if (firstCard.name === secondCard.name) {
        dispatch({ type: 'LOCK_BOARD', payload: true });
        setTimeout(() => {
          console.log('match');
          dispatch({ type: 'LOCK_BOARD', payload: false });
          dispatch({ type: 'FLIP_CARD', payload: firstCard });
          dispatch({ type: 'FLIP_CARD', payload: secondCard });
          lockCards();
        }, 1600);
      } else {
        dispatch({ type: 'LOCK_BOARD', payload: true });
        setTimeout(() => {
          dispatch({ type: 'FlIP_CARD', payload: firstCard });
          dispatch({ type: 'FlIP_CARD', payload: secondCard });
          dispatch({ type: 'SET_FIRST_CARD', payload: null });
          dispatch({ type: 'SET_SECOND_CARD', payload: null });
          dispatch({ type: 'UNFLIP_CARDS', payload: [firstCard.id, secondCard.id] });
          dispatch({ type: 'LOCK_BOARD', payload: false });
        }, 1600);
      }
    }
  };

  const handleCardClick = (card) => {
    console.log('card clicked: ', card.name);
    if (state.lockBoard) return;
    if (!state.firstCard) {
      dispatch({ type: 'SET_FIRST_CARD', payload: card });
      console.log('firstCard: ', state.firstCard);
    } else if (!state.secondCard) {
      dispatch({ type: 'SET_SECOND_CARD', payload: card });
      dispatch({ type: 'SWITCH_PLAYER' });

      // moved to useEffect to update state:
      //checkForMatch();
    }
    dispatch({ type: 'FLIP_CARD', payload: card.id });
  };

  const handleStart = () => {
    dispatch({ type: 'START_GAME' });
    console.log('start game');
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
