import { UIContext } from "../../contexts/UIContext";
import { useContext, useEffect, useState } from "react";
import Conv2d from "./conv2d";
import MaxPool from "./max-pool";
import Dense from "./dense";
import Dropout from "./dropout";
import Flatten from "./flatten";
import Input from "./input";
import Compile from "./compile";
import TrainModel from "./train-model";

export default () => {
  const { node, getNode } = useContext(UIContext);
  const [selectedNode, setSelectedNode] = useState(getNode());
  const [label, setLabel] = useState("");
  const socket = "TRAIN";

  useEffect(() => {
    if (node) {
      setSelectedNode(getNode());
      setLabel(node.data.label);
    }
  }, [node]);
  // console.log(getNode());

  switch (true) {
    case label === "INPUT":
      return <Input node={selectedNode} />;
    case label === "Conv2D":
      return <Conv2d node={selectedNode} />;
    case label === "MaxPool2D":
      return <MaxPool node={selectedNode} />;
    case label === "Dense":
      return <Dense node={selectedNode} />;
    case label === "Dropout":
      return <Dropout node={selectedNode} />;
    case label === "Flatten":
      return <Flatten node={selectedNode} />;
    case label === "COMPILE":
      return <Compile node={selectedNode} socket={socket} />;
    case label === "TRAIN":
      return <TrainModel node={selectedNode} socket={socket} />;
    default:
      return <></>;
  }
};
