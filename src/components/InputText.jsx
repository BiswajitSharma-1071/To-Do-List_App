import React, { useState } from "react";


function InputText(props) {
    const [inputText, setInputText] = useState("");
    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    return (
        <div className="form">
            <form onSubmit={(event) => {
                props.dataItem(inputText);
                setInputText("");
                event.preventDefault();
            }}>
                <input onChange={handleChange} type="text" value={inputText} />
                <button type="submit">
                    <span>Add</span>
                </button>
            </form>
        </div>
    );
}

export default InputText;