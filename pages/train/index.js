import { useContext, useEffect, useState } from "react";
import ToolBar from "../../components/ToolBar";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import { ModelContext } from "../../contexts/ModelContext";
import { SocketContext } from "../../contexts/SocketContext";
import { Divider, MenuItem } from "@blueprintjs/core";
export default () => {
  const socket = useContext(SocketContext);
  const { updateMetric, layers, setWeights, setSelectedLayer } = useContext(
    ModelContext
  );
  const [element, setElement] = useState(layers[1]);
  const [sidebar, setSidebar] = useState(false);

  const switchSidebar = () => setSidebar(!sidebar);
  const setLayer = (e) => {
    setSelectedLayer(e.target.id);
    switchSidebar();
  };
  useEffect(() => {
    if (socket) {
      socket.on("onEpochEnd", ({ epochs, result, weights }) => {
        setWeights(weights);
        updateMetric(result);
      });
    }
  }, [socket]);

  return (
    <div className="train_main">
      <ToolBar mode="train" func={switchSidebar} />
      <div
        className={
          sidebar ? "train-side-bar active bp3-dark" : "train-side-bar bp3-dark"
        }
      >
        <h3 className="bp3-heading">Layers</h3>
        <Divider />
        <ol className="bp3-list bp3-list-unstyled">
          {layers.map((layer) => (
            <li style={{ cursor: "pointer" }} onClick={setLayer} id={layer}>
              {layer}
            </li>
          ))}
        </ol>
      </div>
      <div className="graph-container">
        <div className="model-container">
          <div class="graph1">
            <LineChart graph="Acc" />
          </div>
          <div class="graph2">
            <LineChart graph="Loss" />
          </div>
        </div>
        <div className="layer-container">
          <div class="graph3">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};
