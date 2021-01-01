import { useState, useEffect, useContext } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { ElementsContext } from "../contexts/ElementsContext";

export default () => {
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

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onElementClick={onElementClick}
      onConnect={onConnect}
      deleteKeyCode={46} /* 'delete'-key */
    />
  );
};
