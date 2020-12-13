import { useContext } from "react";
import { ElementsContext } from "../contexts/ElementsContext";

export default ({ socket, addNode }) => {
  const { elements } = useContext(ElementsContext);
  return (
    <>
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
        name="CONCAT"
        onClick={addNode}
        class="btn btn-lg btn-info"
      >
        CONCAT
      </button>
      <button
        type="button"
        name="COMPILE"
        onClick={() => socket.emit("createModel", elements)}
        class="btn btn-lg btn-warning"
      >
        CREATE
      </button>
    </>
  );
};
