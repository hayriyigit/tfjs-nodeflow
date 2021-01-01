import { useContext } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import { UIContext } from "../contexts/UIContext";
import { ElementsContext } from "../contexts/ElementsContext";

export default () => {
  const { elements, setElements } = useContext(ElementsContext);
  const { setNode } = useContext(UIContext);

  const onElementClick = async (event, element) => {
    if (
      !element.id.startsWith("reactflow__edge") &&
      element.data.label != "CONCAT"
    ) {
      setNode(element);
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
      deleteKeyCode={46}
    />
  );
};
