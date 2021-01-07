import { useContext, useEffect } from "react";
import ToolBar from "../../components/ToolBar";
import Chart from "../../components/Chart";
import { ModelContext } from "../../contexts/ModelContext";
import { SocketContext } from "../../contexts/SocketContext";

export default () => {
  const socket = useContext(SocketContext);
  const { updateMetric } = useContext(ModelContext);

  useEffect(() => {
    if (socket) {
      socket.on("onEpochEnd", ({ epochs, result }) => {
        updateMetric(result);
      });
    }
  }, [socket]);

  return (
    <div className="train_main">
      <ToolBar />
      <div class="grid-container">
        <div class="graph1">
          <Chart graph="Acc" />
        </div>
        <div class="graph2">
          <Chart graph="Loss" />
        </div>
      </div>
    </div>
  );
};
