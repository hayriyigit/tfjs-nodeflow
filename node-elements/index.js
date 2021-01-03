import shortid from "shortid";
import { elements } from "./initial-elements";

const createElement = (label) => ({
  id: shortid.generate(),
  data: {
    label,
    args: elements[label].args,
  },
  sourcePosition: "right",
  targetPosition: "left",
  position: { x: 250, y: 25 },
  connectable: true,
  draggable: true,
  selectable: label == "Concatenate" ? false : true,
  style: {
    background: elements[label].color,
    color: "#000",
    border: "1px solid #000",
    width: 100,
    borderRadius: 0,
  },
});

export default (label) => {
  switch (label) {
    // case "INPUT":
    //   return {
    //     id: shortid.generate(),
    //     type: "input",
    //     data: {
    //       label: "INPUT",
    //       args: {
    //         row: 1,
    //         column: 1,
    //         channel: 1,
    //         shape: [1, 1, 1],
    //       },
    //     },
    //     sourcePosition: "right",
    //     targetPosition: "left",
    //     position: { x: 250, y: 25 },
    //     connectable: true,
    //     draggable: true,
    //     selectable: true,
    //   };
    case "Conv2D":
      return createElement(label);
    case "MaxPool2D":
      return createElement(label);
    case "Dense":
      return createElement(label);
    case "Dropout":
      return createElement(label);
    case "Flatten":
      return createElement(label);
    case "Concatenate":
      return createElement(label);
  }
};
