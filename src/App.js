import "./App.css";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import Clocks from "./components/Clocks";

function App() {
  const [clocks, setClocks] = useState([]);

  const handleAdd = (clock) => {
    setClocks((prevClocks) =>
      prevClocks.concat([
        { name: clock.name, timezone: clock.timezone, id: nanoid(4) },
      ])
    );
  };

  const handleRemove = (id) => {
    setClocks((prevClocks) => prevClocks.filter((clock) => clock.id !== id));
  };

  return (
    <div className="container">
      <Form onAddClock={handleAdd} />
      <Clocks clocks={clocks} remove={handleRemove} />
    </div>
  );
}

export default App;
