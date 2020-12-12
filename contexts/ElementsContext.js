import { createContext, useState } from "react";

const ElementsContext = createContext();

const ElementsProvider = ({ children }) => {
  const [elements, setElements] = useState([]);

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
      console.log("called");
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
