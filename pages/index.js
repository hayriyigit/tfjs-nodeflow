import React, { useState, useEffect, useContext } from "react";
import { useSocket } from "../hooks";
import { ElementsContext } from "../contexts/ElementsContext";
import { Divider } from "@blueprintjs/core";
import FlowChart from "../components/FlowChart";
import ToolBar from "../components/ToolBar";
import NodeMenu from "../components/NodeMenu";
import NodeElements from "../node-elements/";
import Forms from "../components/Forms";
import Chart from "../components/Chart";
import NodeButtons from "../components/NodeButtons";

export default () => {
  const socket = useSocket("http://localhost:8001", {
    reconnectionDelay: 300,
    reconnectionDelayMax: 300,
  });
  const {
    elements,
    setElements,
    addElement,
    trainStatus,
    updateMetric,
  } = useContext(ElementsContext);

  const [createStatus, setCreateStatus] = useState(false);
  const [compileStatus, setCompileStatus] = useState(false);
  const [configMenu, setConfigMenu] = useState(false);
  const [nodeMenu, setNodeMenu] = useState(false);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on("created", ({ status, message }) => {
        console.log("Model Create Status");
        console.log("Status: ", status);
        console.log("Message: ", message);
        setCreateStatus(status);
        setConfigMenu(true);
        if (status) setNode({ data: { label: "COMPILE" } });
      });

      socket.on("compailed", ({ status, message }) => {
        console.log("Model Compile Status");
        console.log("Status: ", status);
        console.log("Message: ", message);
        setCompileStatus(status);
        setConfigMenu(true);
        if (status) setNode({ data: { label: "TRAIN" } });
      });

      socket.on("onEpochEnd", (data) => {
        updateMetric(data);
      });
    }
  }, [socket]);

  const addNode = (e) => {
    const newElement = NodeElements(e.target.name);
    addElement(newElement);
  };

  const nodeMenuSwitch = () => {
    if (trainStatus) return "node__menu chart";
    else if (nodeMenu) return "node__menu active";
    else return "node__menu";
  };
  return (
    <div className="main">
      <div className="side-bar bp3-dark">
        <h3 className="bp3-heading">Settings</h3>
        <Divider />
        <Forms />
      </div>
      <div className="content">
        <ToolBar />
        <NodeMenu />
        <FlowChart />
      </div>
    </div>
  );
};
