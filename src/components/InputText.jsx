import React, { useState } from "react";

const InputText = (props) => {
  const [inputText, setInputText] = useState("");
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  return (
    <div className="form">
      <form
        onSubmit={(event) => {
          inputText.trim() !== ""
            ? props.dataItem(inputText)
            : props.setErr(`Enter something in the input box to Add to the list
(Note: Input cannot consist of only white spaces.)`);

          setInputText("");
          event.preventDefault();
        }}
      >
        <input onChange={handleChange} type="text" value={inputText} />
        <button type="submit" onBlur={() => props.setErr("")}>
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};

export default InputText;
