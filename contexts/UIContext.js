import { createContext, useState, useEffect } from "react";

const UIContext = createContext();

const UIProvider = ({ children }) => {
  const [node, setNode] = useState(null);

  // useEffect(() => {
  //   console.log(node);
  // }, [node]);
  const getNode = () => node;
  return (
    <UIContext.Provider
      value={{
        node,
        setNode,
        getNode,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export { UIProvider, UIContext };
