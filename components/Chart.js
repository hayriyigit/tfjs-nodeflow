import React, { useContext, useEffect, useState } from "react";
import { ElementsContext } from "../contexts/ElementsContext";

import { Line } from "react-chartjs-2";

const getState = (length, metric) => ({
  labels: [...Array(length).keys()],
  datasets: [
    {
      label: "Loss",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: metric.loss,
    },
    {
      label: "Val Loss",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(255,99,132,0.4)",
      borderColor: "rgb(255,99,132,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(255,99,132,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: metric.val_loss,
    },
  ],
});

export default () => {
  const { metric } = useContext(ElementsContext);
  const [chartState, setChartState] = useState(null);

  useEffect(() => {
    setChartState(getState(metric.loss.length, metric));
  }, [metric]);

  return (
    <div style={{ height: "100%", width: "50%" }}>
      <Line data={chartState} />
    </div>
  );
};
