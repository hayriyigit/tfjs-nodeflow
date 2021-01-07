import { createContext, useEffect, useState } from "react";

const ElementsContext = createContext();
const initialNode = [
  {
    id: "FS_BATPu_",
    type: "default",
    position: { x: 873, y: 107 },
    data: {
      label: "Dense",
      args: {
        units: 10,
        activation: "softmax",
        kernelInitializer: "heUniform",
      },
    },
  },
  {
    id: "ZPvKyODIw",
    type: "default",
    position: { x: 581, y: 107 },
    data: {
      label: "MaxPool2D",
      args: {
        poolSize: 2,
        strides: 2,
        padding: "valid",
        dataFormat: "channelsFirst",
      },
    },
  },
  {
    id: "9t6qVgFqv",
    type: "default",
    position: { x: 438, y: 110 },
    data: {
      label: "Conv2D",
      args: {
        filters: 16,
        kernelSize: 5,
        strides: 1,
        padding: "valid",
        activation: "relu",
        kernelInitializer: "heUniform",
      },
    },
  },
  {
    id: "vjTIYTZ8Z",
    type: "default",
    position: { x: 323, y: 149 },
    data: {
      label: "MaxPool2D",
      args: {
        poolSize: 2,
        strides: 2,
        padding: "valid",
        dataFormat: "channelsFirst",
      },
    },
  },
  {
    id: "g8MQ2J0IQ",
    type: "default",
    position: { x: 205, y: 103 },
    data: {
      label: "Conv2D",
      args: {
        filters: 8,
        kernelSize: 3,
        strides: 1,
        padding: "valid",
        activation: "relu",
        kernelInitializer: "heUniform",
      },
    },
  },
  {
    id: "input_1",
    type: "input",
    position: { x: 21, y: 102 },
    data: { label: "INPUT", args: { shape: [28, 28, 1] } },
  },
  {
    id: "lt0HR8n1h",
    data: {
      label: "Flatten",
      args: {
        dataFormat: "channelFirst",
      },
    },
    sourcePosition: "right",
    targetPosition: "left",
    position: { x: 250, y: 25 },
    connectable: true,
    draggable: true,
    selectable: true,
    style: {
      background: "#FFD966",
      color: "#000",
      border: "1px solid #000",
      width: 100,
      borderRadius: 0,
    },
  },
  {
    source: "input_1",
    sourceHandle: null,
    target: "g8MQ2J0IQ",
    targetHandle: null,
    type: "smoothstep",
    id: "reactflow__edge-input_1null-g8MQ2J0IQnull",
  },
  {
    source: "g8MQ2J0IQ",
    sourceHandle: null,
    target: "vjTIYTZ8Z",
    targetHandle: null,
    type: "smoothstep",
    id: "reactflow__edge-g8MQ2J0IQnull-vjTIYTZ8Znull",
  },
  {
    source: "vjTIYTZ8Z",
    sourceHandle: null,
    target: "9t6qVgFqv",
    targetHandle: null,
    type: "smoothstep",
    id: "reactflow__edge-vjTIYTZ8Znull-9t6qVgFqvnull",
  },
  {
    source: "9t6qVgFqv",
    sourceHandle: null,
    target: "ZPvKyODIw",
    targetHandle: null,
    type: "smoothstep",
    id: "reactflow__edge-9t6qVgFqvnull-ZPvKyODIwnull",
  },
  {
    source: "ZPvKyODIw",
    sourceHandle: null,
    target: "lt0HR8n1h",
    targetHandle: null,
    type: "smoothstep",
    id: "reactflow__edge-ZPvKyODIwnull-lt0HR8n1hnull",
  },
  {
    source: "lt0HR8n1h",
    sourceHandle: null,
    target: "FS_BATPu_",
    targetHandle: null,
    type: "smoothstep",
    id: "reactflow__edge-lt0HR8n1hnull-FS_BATPu_null",
  },
];

const ElementsProvider = ({ children }) => {
  const [elements, setElements] = useState(initialNode);

  const getElements = () => elements;

  const addElement = (newElement) => {
    try {
      setElements([newElement, ...elements]);
    } catch (e) {
      console.error(e);
    }
  };

  const updateElement = (newElement) => {
    try {
      const els = elements.filter((element) => element.id != newElement.id);
      setElements([newElement, ...els]);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteElement = (delElement) => {
    try {
      const els = elements.filter((element) => element.id != delElement.id);
      setElements([...els]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ElementsContext.Provider
      value={{
        elements,
        setElements,
        getElements,
        addElement,
        updateElement,
        deleteElement,
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
};

export { ElementsProvider, ElementsContext };
