import React, { useState, useEffect, useContext } from "react";
import { useSocket } from "../hooks";
import { ElementsContext } from "../contexts/ElementsContext";
import { UIContext } from "../contexts/UIContext";

import { Divider } from "@blueprintjs/core";
import FlowChart from "../components/FlowChart";
import ToolBar from "../components/ToolBar";
import NodeMenu from "../components/NodeMenu";

import Forms from "../components/Forms";
import Chart from "../components/Chart";
import NodeButtons from "../components/NodeButtons";

export default () => {
  const socket = useSocket("http://localhost:8001", {
    reconnectionDelay: 300,
    reconnectionDelayMax: 300,
  });
  const { addElement, trainStatus, updateMetric } = useContext(ElementsContext);
  const { getNode } = useContext(UIContext);

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

  return (
    <div className="main">
      <div className="side-bar bp3-dark">
        <h3 className="bp3-heading">Settings</h3>
        <Divider />
        {/* {console.log(getNode())} */}
        {getNode() ? <Forms /> : null}
      </div>
      <div className="content">
        <ToolBar />
        <NodeMenu />
        <FlowChart />
      </div>
    </div>
  );
};
