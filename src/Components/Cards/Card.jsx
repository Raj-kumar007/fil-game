import React from 'react'
import './Card.css'
const Card = ({ card, handleClick }) => {
  return (
    <>
         <div className={`card ${card.isFlipped ? 'flip' : ''}`}
      onClick={() => handleClick(card)}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.symbol}</div>
      </div>
    </div>
    </>
  )
}

export default Card
