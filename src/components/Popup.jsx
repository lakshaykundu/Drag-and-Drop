import React from "react";

const Popup = ({ card, onClose }) => {
  return (
    <div className="popup">
      <h3>{card.text}</h3>
      <p>Full details about the card...</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Popup;
