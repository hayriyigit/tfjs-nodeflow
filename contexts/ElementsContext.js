import { createContext, useEffect, useState } from "react";

const ElementsContext = createContext();
const initialNode = {
  id: "input_1",
  type: "input",
  data: {
    label: "INPUT",
    args: {
      row: 1,
      column: 1,
      channel: 1,
      shape: [1, 1, 1],
    },
  },
  connectable: true,
  draggable: true,
  position: {
    x: 0,
    y: 0,
  },
  sourcePosition: "right",
};

const ElementsProvider = ({ children }) => {
  const [elements, setElements] = useState([initialNode]);

  const addElement = (newElement) => {
    try {
      setElements([newElement, ...elements]);
    } catch (e) {
      console.error(e);
    }
  };

  const updateElement = (newElement) => {
    try {
      const els = elements.filter((element) => element.id != newElement.id);
      setElements([newElement, ...els]);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteElement = (delElement) => {
    try {
      const els = elements.filter((element) => element.id != delElement.id);
      setElements([...els]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ElementsContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        updateElement,
        deleteElement,
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
};

export { ElementsProvider, ElementsContext };
