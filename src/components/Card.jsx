import React, { useState } from "react";

const Card = ({ card, onUpdate, onClick }) => {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({
    width: card.width,
    height: card.height,
  });

  const startDrag = (e) => {
    if (!resizing) {
      setDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
    }
    e.preventDefault();
  };

  const onDrag = (e) => {
    if (dragging && !resizing) {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      onUpdate(card.id, {
        x: card.x + deltaX,
        y: card.y + deltaY,
      });
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const stopDrag = () => {
    setDragging(false);
  };

  const startResize = (e) => {
    setResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width: card.width, height: card.height });
    e.preventDefault();
  };

  const onResize = (e) => {
    if (resizing) {
      const newWidth = startSize.width + (e.clientX - startPos.x);
      const newHeight = startSize.height + (e.clientY - startPos.y);
      onUpdate(card.id, {
        width: newWidth > 50 ? newWidth : 50,
        height: newHeight > 50 ? newHeight : 50,
      });
    }
  };

  const stopResize = () => {
    setResizing(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: card.y,
        left: card.x,
        width: card.width,
        height: card.height,
        background: "pink",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        cursor: "move",
      }}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      // onClick={onClick}
    >
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {card.text}
        <button onClick={onClick} className="buttonStyle">
          Show More
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          width: "10px",
          height: "10px",
          background: "#333",
          cursor: "nwse-resize",
        }}
        onMouseDown={startResize}
        onMouseMove={onResize}
        onMouseUp={stopResize}
        onMouseLeave={stopResize}
      />
    </div>
  );
};

export default Card;
