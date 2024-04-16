import './MemoryCard.css';

function MemoryCard({ card, name, imageUrl, onClick, isFlipped }) {

  const handleClick = () => {
    if(!isFlipped) {
      onClick(card);
    }
  };

  return (
    <div className={"card ${isFlipped ? 'flipped' : ''}"} onClick={handleClick} data-name={name}>
        <div className={`card-front ${isFlipped ? 'visible' : ''}`}>
          <img src={imageUrl} alt={name} className="front-face" />
        </div>
        <div className={`card-back ${!isFlipped ? 'visible' : ''}`}>
          <img src="src/assets/img/backface.jpg" alt="backface" className="back-face" />
        </div>
    </div>
  );
}
export default MemoryCard;