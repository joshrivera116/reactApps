import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [listItem, setListItem] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [typeSelected, setTypeSelected] = useState("all");
  const [Activated, setActivated] = useState([]);
  const [Complete, setComplete] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const all = () => {
    setTypeSelected("all");
  };

  const active = () => {
    setTypeSelected("active");
    setActivated(checkboxes.filter((checkbox) => !checkbox.checked));
  };

  const completed = () => {
    setTypeSelected("completed");
    setComplete(checkboxes.filter((checkbox) => checkbox.checked));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput("");
    if (input.trim() !== "") {
      setListItem([...listItem, input]);
      setCheckboxes([
        ...checkboxes,
        { id: listItem.length + 1, checked: false, item: input },
      ]);
      setInput("");
    }
  };

  const handleCheckBox = (id) => {
    setCheckboxes((prevCheckBoxes) =>
      prevCheckBoxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  return (
    <div className="App">
      <div className="todo-card">
        <h1>THINGS TO DO</h1>
        <div className="add-new">
          <input
            className="add-bar"
            type="text"
            placeholder="add new"
            onChange={handleInputChange}
          />
          <button className="submit" onClick={handleSubmit}>
            submit
          </button>
        </div>
        <div className="list-items">
          <ul className="unordered-list">
            {typeSelected === "all"
              ? listItem.map((item, index) => (
                  <li key={index} className="list-item">
                    <div className="item">
                      <input
                        type="checkbox"
                        checked={checkboxes[index]?.checked || false}
                        className={
                          checkboxes[index].checked ? "completed" : "active"
                        }
                        onChange={() => handleCheckBox(checkboxes[index]?.id)}
                      />
                      {item}
                    </div>
                  </li>
                ))
              : typeSelected === "completed"
              ? Complete.map((item, index) => (
                  <li key={index} className="list-item">
                    <label className="item complete">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        className="items"
                        onChange={() => handleCheckBox(item.id)}
                      />
                      {item.item}
                    </label>
                  </li>
                ))
              : Activated.map((item, index) => (
                  <li key={index} className="list-item">
                    <label className="item">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        className="items"
                        onChange={() => handleCheckBox(item.id)}
                      />
                      {item.item}
                    </label>
                  </li>
                ))}
          </ul>
        </div>
        <div className="footer">
          <div className="number-of-items">
            <div className="firstHalf">
              <span>{Activated.length} Items To Do</span>
            </div>
            <div className="secondHalf">
              <button onClick={all}>All</button>
              <button onClick={active}>Active</button>
              <button onClick={completed}>Completed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
