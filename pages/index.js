import React, { useState, useEffect, useContext } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { useSocket } from "../hooks";
import { ElementsContext } from "../contexts/ElementsContext";

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

  useEffect(() => {
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
        x: 250,
        y: 25,
      },
      sourcePosition: "right",
    };

    addElement(initialNode);
  }, []);

  const handleClick = () => setConfigMenu(!configMenu);

  const onElementClick = async (event, element) => {
    if (
      !element.id.startsWith("reactflow__edge") &&
      element.data.label != "CONCAT"
    ) {
      (!configMenu || node.id == element.id || !node) && handleClick();

      setNode(element);
      setNodeMenu(nodeMenu && false);
    }
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) =>
    setElements((els) => {
      params.type = "smoothstep";
      return addEdge(params, els);
    });

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
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onElementClick={onElementClick}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      />

      <div className={configMenu ? "config__menu active" : "config__menu"}>
        {node ? <Forms node={node} socket={socket} /> : null}
      </div>

      <div className={nodeMenuSwitch()}>
        {trainStatus ? (
          <Chart />
        ) : (
          <NodeButtons socket={socket} addNode={addNode} />
        )}
        <button
          class="btn-block navbar-toggler navbar-light activator"
          type="button"
          onClick={() => setNodeMenu(!nodeMenu)}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  );
};
