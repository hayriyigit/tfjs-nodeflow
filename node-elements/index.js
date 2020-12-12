import shortid from "shortid";

export default (node) => {
  switch (node) {
    case "INPUT":
      return {
        id: shortid.generate(),
        type: "input",
        data: {
          label: "INPUT",
          args: {
            row: 1,
            column: 1,
            channel: 1,
          },
        },
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 250, y: 25 },
        connectable: true,
        draggable: true,
        selectable: true,
      };
    case "CONV":
      return {
        id: shortid.generate(),
        data: {
          label: "CONV",
          args: {
            filters: 1,
            kernelSize: 1,
            strides: 1,
            padding: "valid",
            activation: "relu",
            kernelInitializer: "heUniform",
          },
        },
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 250, y: 25 },
        connectable: true,
        draggable: true,
        selectable: true,
        style: {
          background: "#E06666",
          color: "#000",
          border: "1px solid #000",
          width: 100,
          borderRadius: 0,
        },
      };
    case "POOL":
      return {
        id: shortid.generate(),
        data: {
          label: "POOL",
          args: {
            poolSize: 1,
            strides: 1,
            padding: "valid",
            dataFormat: "channelFirst",
          },
        },
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 450, y: 450 },
        connectable: true,
        draggable: true,
        selectable: true,
        style: {
          background: "#D9D9D9",
          color: "#000",
          border: "1px solid #000",
          width: 100,
          borderRadius: 0,
        },
      };
    case "DENSE":
      return {
        id: shortid.generate(),
        data: {
          label: "DENSE",
          args: {
            units: 1,
            activation: "relu",
            kernelInitializer: "heUniform",
          },
        },
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 450, y: 450 },
        connectable: true,
        draggable: true,
        selectable: true,
        style: {
          background: "#6D9EEB",
          color: "#000",
          border: "1px solid #000",
          width: 100,
          borderRadius: 0,
        },
      };
    case "DROPOUT":
      return {
        id: shortid.generate(),
        data: {
          label: "DROPOUT",
          args: {
            rate: 0,
          },
        },
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 450, y: 450 },
        connectable: true,
        draggable: true,
        selectable: true,
        style: {
          background: "#93C47D",
          color: "#000",
          border: "1px solid #000",
          width: 100,
          borderRadius: 0,
        },
      };
    case "FLATTEN":
      return {
        id: shortid.generate(),
        data: {
          label: "FLATTEN",
          args: {
            dataFormat: "channelFirst",
          },
        },
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 450, y: 450 },
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
      };
    case "CONCAT":
      return {
        id: shortid.generate(),
        data: {
          label: "CONCAT",
        },
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 450, y: 450 },
        connectable: true,
        draggable: true,
        selectable: true,
        style: {
          background: "#B4A7D6",
          color: "#000",
          border: "1px solid #000",
          width: 100,
          borderRadius: 0,
        },
      };
  }
};
