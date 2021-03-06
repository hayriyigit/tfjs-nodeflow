import { UIContext } from "../../contexts/UIContext";
import { useContext, useEffect, useState } from "react";
import Conv2d from "./conv2d";
import SepConv2d from "./sepconv2d";
import MaxPool from "./max-pool";
import Dense from "./dense";
import Dropout from "./dropout";
import Flatten from "./flatten";
import Input from "./input";
import Compile from "./compile";
import TrainModel from "./train-model";
import AvgPool from "./avg-pool";

export default () => {
  const { node, getNode } = useContext(UIContext);
  const [selectedNode, setSelectedNode] = useState(getNode());
  const [label, setLabel] = useState("");
  const socket = "TRAIN";

  useEffect(() => {
    if (node) {
      setSelectedNode(getNode());
      node.data ? setLabel(node.data.label) : setLabel(node);
    }
  }, [node]);

  switch (true) {
    case label === "INPUT":
      return <Input node={selectedNode} />;
    case label === "Conv2D":
      return <Conv2d node={selectedNode} />;
    case label === "SepConv2D":
      return <SepConv2d node={selectedNode} />;
    case label === "MaxPool2D":
      return <MaxPool node={selectedNode} />;
    case label === "AvgPooling2D":
      return <AvgPool node={selectedNode} />;
    case label === "Dense":
      return <Dense node={selectedNode} />;
    case label === "Dropout":
      return <Dropout node={selectedNode} />;
    case label === "Flatten":
      return <Flatten node={selectedNode} />;
    case label === "compile":
      return <Compile />;
    case label === "train":
      return <TrainModel node={selectedNode} socket={socket} />;
    default:
      return <></>;
  }
};
