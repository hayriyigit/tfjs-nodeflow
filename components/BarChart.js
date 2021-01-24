import React, { useEffect, useState, useContext } from "react";
import { ModelContext } from "../contexts/ModelContext";
import { Bar } from "react-chartjs-2";

const getData = (weights, layer) => ({
  labels: [...Object.keys(weights)],
  datasets: [
    {
      label: `Weights ${layer}`,
      data: Object.values(weights),
      backgroundColor: "rgba(255, 99, 132)",
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default () => {
  const { weights, selectedLayer } = useContext(ModelContext);
  const [chartState, setChartState] = useState(null);

  useEffect(() => {
    weights[selectedLayer]
      ? setChartState(getData(weights[selectedLayer], selectedLayer))
      : setChartState(getData({}, ""));
  }, [weights, selectedLayer]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Bar data={chartState} options={options} />
    </div>
  );
};
