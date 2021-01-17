import React, { useState } from "react";
import ListItem from "./ListItem";
import InputText from "./InputText";
import Footer from "./Footer";

function App() {
  const [items, setItems] = useState([]);
  const [deletedItem, setDeletedItem] = useState([]);
  const [err, setErr] = useState("");

  function addItem(inputText) {
    if (inputText.trim() !== "") {
      setItems((prevItems) => {
        return [...prevItems, inputText.trim()];
      });
    } else {
      alert(`Enter something in the input box to Add to the list
(Note: Input cannot consist of only white spaces.)`);
    }
  }

  function deleteItem(id) {
    setDeletedItem([
      ...deletedItem,
      {
        index: id,
        txt: items[id],
      },
    ]);

    setItems((preValues) => {
      return preValues.filter((element, index) => {
        return index !== id;
      });
    });
    // console.log('After del: ' + items)
  }

  function rollbackItem() {
    if (deletedItem.length) {
      let deleItems = deletedItem;
      let delItems = deleItems.pop();
      let ind = delItems.index;
      let textData = delItems.txt;
      let newItems = [...items];

      newItems.splice(ind, 0, textData);
      // console.log(deletedItem)
      // console.log('After Rollback: ' + newItems)
      setItems([...newItems]);
      setDeletedItem(deleItems);
      setErr("");
    } else setErr("No items to Undo");
  }

  function clearList() {
    if (
      items.length &&
      window.confirm(
        "This action will delete all the items in the list. \n Do you wish to continue ?"
      )
    ) {
      if (items.length) {
        setItems([]);
      } else {
        setErr("No Items in the List");
      }
    } else {
      setErr("No Items to clear");
    }
  }

  return (
    <div>
      <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <InputText dataItem={addItem} />
        <div>
          <ul>
            {items.map((todoItem, index) => (
              <ListItem
                key={index}
                id={index}
                data={todoItem}
                onDoubleClick={deleteItem}
              />
            ))}
          </ul>
        </div>
        <button onClick={rollbackItem} onMouseOut={() => setErr("")}>
          <span>Undo</span>
        </button>
        <span></span>
        <button onClick={clearList} onMouseOut={() => setErr("")}>
          <span>Clear List</span>
        </button>
        {err && <div style={{ color: "red" }}>{err}</div>}
      </div>
      <Footer />
    </div>
  );
}

export default App;
