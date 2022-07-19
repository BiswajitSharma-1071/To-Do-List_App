import React, { useState, Fragment } from "react";
import ListItem from "./ListItem";
import InputText from "./InputText";
import Footer from "./Footer";
import { v4 } from "uuid";
import _ from "lodash";

const App = () => {
  const [items, setItems] = useState([]);
  const [deletedItem, setDeletedItem] = useState([]);
  const [err, setErr] = useState("");

  const addItem = (inputText) => {
    if (inputText.trim() !== "") {
      setItems((prevItems) => {
        return [...prevItems, { id: v4(), inputText: inputText.trim() }];
      });
      setErr("");
    }
  };

  const deleteItem = (id) => {
    setDeletedItem([
      ...deletedItem,
      {
        index: id,
        item: items[id],
      },
    ]);

    setItems((preValues) => {
      return preValues.filter((element, index) => {
        return index !== id;
      });
    });
    // console.log('After del: ' + items)
  };

  const rollbackItem = () => {
    if (deletedItem.length) {
      let deleItems = _.cloneDeep(deletedItem);
      let itemToBeAdded = deleItems.pop();
      let ind = itemToBeAdded.index;
      let data = itemToBeAdded.item;
      let newItems = _.cloneDeep(items);

      newItems.splice(ind, 0, data);
      setItems([...newItems]);
      setDeletedItem(deleItems);
    }
  };

  const clearList = () => {
    if (
      items.length &&
      window.confirm(
        "This action will delete all the items in the list. \n Do you wish to continue ?"
      )
    ) {
      setItems([]);
      setDeletedItem([]);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <InputText dataItem={addItem} setErr={setErr} />
        {err && (
          <div
            style={{
              fontFamily: "Open Sans",
              fontSize: "0.7rem",
              position: "relative",
              color: "red",
            }}
          >
            {err}
          </div>
        )}
        <div
          style={{ overflowY: "auto", height: "250px", marginBottom: "15px" }}
        >
          <ul>
            {items.map((todoItem, index) => (
              <ListItem
                key={todoItem.id}
                id={index}
                data={todoItem}
                deleteItem={deleteItem}
              />
            ))}
          </ul>
        </div>
        {err.trim() === "" && (
          <div>
            <button
              style={{ float: "left" }}
              onClick={rollbackItem}
              disabled={deletedItem.length === 0}
            >
              Undo
            </button>
            <button
              style={{ float: "right" }}
              onClick={clearList}
              disabled={items.length === 0}
            >
              Clear List
            </button>
          </div>
        )}
      </div>
      <Footer />
    </Fragment>
  );
};

export default App;
