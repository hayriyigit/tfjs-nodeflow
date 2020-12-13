import Conv2d from "./conv2d";
import MaxPool from "./max-pool";
import Dense from "./dense";
import Dropout from "./dropout";
import Flatten from "./flatten";
import Input from "./input";
import Compile from "./compile";
import TrainModel from "./train-model";

export default ({ node, socket }) => {
  switch (node.data.label) {
    case "INPUT":
      return <Input node={node} />;
    case "CONV":
      return <Conv2d node={node} />;
    case "POOL":
      return <MaxPool node={node} />;
    case "DENSE":
      return <Dense node={node} />;
    case "DROPOUT":
      return <Dropout node={node} />;
    case "FLATTEN":
      return <Flatten node={node} />;
    case "COMPILE":
      return <Compile node={node} socket={socket} />;
    case "TRAIN":
      return <TrainModel node={node} socket={socket} />;
  }
};
