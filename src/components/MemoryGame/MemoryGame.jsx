import './MemoryGame.css';
import { useEffect, useReducer } from 'react';
import MemoryCard from '../MemoryCard/MemoryCard';

const initialCardsData = [
  { name: "🪲", image: "img/1.svg" },
  { name: "🏵️", image: "img/2.svg" },
  { name: "🐦", image: "img/3.svg" },
  { name: "😸", image: "img/4.svg" },
];

const initialState = {
  cardsData: initialCardsData,
  firstCard: null,
  secondCard: null,
  lockBoard: false,
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
    default:
      return state;
  }
}

function MemoryGame() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      dispatch({ type: 'SET_CARDS_DATA', payload: shuffleArray(initialCardsData) });
    }, []);

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

    const checkForMatch = (card) => {
      console.log(firstCard, secondCard)
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
        checkForMatch(card);
      }
      dispatch({ type: 'FLIP_CARD', payload: card.id });
    };

    return (
        <div className="container">
          <section className="board">
            {state.cardsData.map((card, id) => (
              <MemoryCard
                key={id}
                name={card.name}
                image={card.image}
                isFlipped={card.isFlipped}
                onClick={() => handleCardClick(card)} 
              />
            ))}
          </section>
      </div>
    );
  }

  export default MemoryGame;