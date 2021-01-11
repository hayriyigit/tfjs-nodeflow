import { createContext, useEffect } from "react";
import { useSocket } from "../hooks";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = useSocket("http://localhost:8001", {
    reconnectionDelay: 300,
    reconnectionDelayMax: 300,
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
