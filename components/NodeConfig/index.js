import { Conv2d, MaxPool, Dense, Dropout, Flatten } from "./layer_forms";

export default ({ node }) => {
  switch (node.data.label) {
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
  }
};
