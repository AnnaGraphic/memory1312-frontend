import './MemoryCard.css';

function MemoryCard({ id, name, image, onClick, isFlipped }) {

  const handleClick = () => {
    onClick(id, name);
  };

  return (
    <div className={"card ${isFlipped ? 'flipped' : ''}"} onClick={handleClick} data-name={name}>
        <div className={`card-front ${isFlipped ? 'visible' : ''}`}>
          <img src={image} alt={name} className="front-face" />
        </div>
        <div className={`card-back ${!isFlipped ? 'visible' : ''}`}>
          <img src="img/backface.svg" alt="backface" className="back-face" />
        </div>
    </div>
  );
}
export default MemoryCard;