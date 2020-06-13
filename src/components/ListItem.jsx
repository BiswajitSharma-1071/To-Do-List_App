import React,{useState} from "react";

function ListItem(props) {
  const [isDone, setDone] = useState(false);

  function handleClick() {
    setDone(preValue => {
      return !preValue;
    });
  }

  return (
    <div>
      <li
        style={{ textDecoration: isDone ? "line-through" : "none" }}
        onClick={handleClick}
        onDoubleClick={() => {
          props.onDoubleClick(props.id);
        }}
      >
        {props.data}
      </li>
    </div>
  );
}

export default ListItem;
