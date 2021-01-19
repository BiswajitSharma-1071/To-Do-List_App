import React, { useState } from "react";

const ListItem = ({ id, data, deleteItem }) => {
  const [isDone, setDone] = useState(false);

  const handleClick = (e) => {
    setDone((preValue) => {
      return !preValue;
    });
    e.preventDefault();
  };

  return (
    <div style={{ display: "flex" }}>
      <li
        style={{
          textDecoration: isDone ? "line-through" : "none",
          width: "90%",
        }}
        onClick={handleClick}
      >
        {data.inputText}
      </li>
      <svg
        style={{ float: "right" }}
        className="delete-icon"
        focusable="false"
        viewBox="0 0 24 24"
        onClick={(e) => {
          e.preventDefault();
          deleteItem(id);
        }}
      >
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </div>
  );
};

export default ListItem;
