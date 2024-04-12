export const checkForMatch = (state, dispatch) => {
  console.log('checkForMatch');
  const { firstCard, secondCard } = state;
  if (firstCard && secondCard) {
    if (firstCard.name === secondCard.name) {
      setTimeout(() => {
        console.log('match');
        dispatch({ type: 'LOCK_BOARD', payload: false });
        dispatch({ type: 'FLIP_CARD', payload: null });
        dispatch({ type: 'FLIP_CARD', payload: null });
      }, 1600);
    } else {
    dispatch({ type: 'LOCK_BOARD', payload: true });
      console.log('no match')
      setTimeout(() => {
        dispatch({ type: 'UNFLIP_CARDS', payload: [firstCard.id, secondCard.id] });
        dispatch({ type: 'FLIP_CARD', payload: firstCard });
        dispatch({ type: 'FLIP_CARD', payload: secondCard });
        dispatch({ type: 'LOCK_BOARD', payload: false });
      }, 1600);
    }
  }
};
