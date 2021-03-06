import { useContext, useEffect, useState } from "react";
import { ModelContext } from "../contexts/ModelContext";

import { Line } from "react-chartjs-2";

const getState = (length, metric, name) => ({
  labels: [...Array(length).keys()],
  datasets: [
    {
      label: name,
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
      data: metric[name.toLowerCase()],
    },
    {
      label: `Val ${name}`,
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
      data: metric[`val_${name.toLowerCase()}`],
    },
  ],
});

export default ({ graph }) => {
  const { metric } = useContext(ModelContext);
  const [chartState, setChartState] = useState(null);

  useEffect(() => {
    setChartState(getState(metric.loss.length, metric, graph));
  }, [metric]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Line data={chartState} />
    </div>
  );
};
