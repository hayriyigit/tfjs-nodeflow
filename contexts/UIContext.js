import { createContext, useState } from "react";

const UIContext = createContext();

const UIProvider = ({ children }) => {
  const [node, setNode] = useState(null);

  return (
    <UIContext.Provider
      value={{
        node,
        setNode,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export { UIProvider, UIContext };
