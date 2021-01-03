import { createContext, useEffect } from "react";
import { useSocket } from "../hooks";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = useSocket("http://localhost:8001", {
    reconnectionDelay: 300,
    reconnectionDelayMax: 300,
  });

  // useEffect(() => {
  //   if (socket) {
  //     // socket.on("create_status", ({ status, message }) => {
  //     //   setCreateStatus(status);
  //     // });

  //     socket.on("compailed", ({ status, message }) => {
  //       console.log("Model Compile Status");
  //       console.log("Status: ", status);
  //       console.log("Message: ", message);
  //       // setCompileStatus(status);
  //       // setConfigMenu(true);
  //       // if (status) setNode({ data: { label: "TRAIN" } });
  //     });

  //     //   socket.on("onEpochEnd", (data) => {
  //     //     updateMetric(data);
  //     //   });
  //   }
  // }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
