import React, { useState, useEffect } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";

import NodeElements from "../node-elements/";
import NodeConfig from "../components/NodeConfig/index";

import { modelMapper } from "../utils/model-mapper";

export default () => {
  const [elements, setElements] = useState([
    {
      id: "input",
      type: "input",
      data: {
        label: "INPUT",
        args: {
          shape: [24, 24, 1],
        },
      },
      sourcePosition: "right",
      targetPosition: "left",
      position: { x: 250, y: 25 },
      connectable: true,
      draggable: true,
      selectable: true,
    },
  ]);
  const [configMenu, setConfigMenu] = useState(false);
  const [nodeMenu, setNodeMenu] = useState(false);
  const [node, setNode] = useState(null);

  useEffect(() => {}, [node]);

  const handleClick = () => setConfigMenu(!configMenu);
  const closeConfigMenu = () => setConfigMenu(false);

  const onElementClick = async (event, element) => {
    if (!element.id.startsWith("reactflow__edge")) {
      (!configMenu || node.id == element.id || !node) && handleClick();
      setNode(element);
      setNodeMenu(nodeMenu && false);
    }
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) =>
    setElements((els) => {
      params.type = "straight";
      return addEdge(params, els);
    });
  const addNode = (e) => {
    setElements([...elements, NodeElements(e.target.name)]);
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
        {node ? <NodeConfig node={node} /> : null}
      </div>

      <div className={nodeMenu ? "node__menu active" : "node__menu"}>
        <button
          type="button"
          name="CONV"
          onClick={addNode}
          class="btn btn-lg btn-primary"
        >
          CONV2D
        </button>
        <button
          type="button"
          name="DROPOUT"
          onClick={addNode}
          class="btn btn-lg btn-danger"
        >
          DROPOUT
        </button>
        <button
          type="button"
          name="POOL"
          onClick={addNode}
          class="btn btn-lg btn-success"
        >
          MAX POOLING
        </button>
        <button
          type="button"
          name="FLATTEN"
          onClick={addNode}
          class="btn btn-lg btn-info"
        >
          FLATTEN
        </button>
        <button
          type="button"
          name="DENSE"
          onClick={addNode}
          class="btn btn-lg btn-warning"
        >
          DENSE
        </button>

        <button
          type="button"
          name="COMPILE"
          onClick={() => modelMapper(elements)}
          class="btn btn-lg btn-warning"
        >
          COMPILE
        </button>

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
