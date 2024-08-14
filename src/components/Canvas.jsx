import React, { useState } from "react";
import Card from "./Card";
import Popup from "./Popup";

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      text: `Hubnine India Private Limited
Reactjs Assignment card No- ${cards.length + 1}`,
      x: 100,
      y: 100,
      width: 200,
      height: 150,
    };
    setCards([...cards, newCard]);
  };

  const updateCard = (id, updates) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, ...updates } : card))
    );
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <button onClick={addCard}>Add Card</button>
      <div
        style={{
          overflow: "auto",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onUpdate={updateCard}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      {selectedCard && (
        <Popup card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
};

export default Canvas;
