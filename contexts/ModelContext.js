import { createContext, useEffect, useState } from "react";

const ModelContext = createContext();

const ModelProvider = ({ children }) => {
  const [trainStatus, setTrainStatus] = useState(false);
  const [compData, setCompData] = useState({
    optimizer: "sgd",
    loss: "absoluteDifference",
  });
  const [trainData, setTrainData] = useState({
    batchSize: 1,
    epochs: 1,
    shuffle: true,
  });
  const [metric, setMetric] = useState({
    loss: [],
    val_loss: [],
  });

  useEffect(() => {
    console.log("compData changed!");
    console.log(trainData);
  }, [trainData]);

  const updateMetric = (newMetric) => {
    try {
      console.log(newMetric);
      const newLoss = [...metric.loss, newMetric.result.loss];
      const newValLoss = [...metric.val_loss, newMetric.result.val_loss];
      setMetric({ loss: newLoss, val_loss: newValLoss });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModelContext.Provider
      value={{
        trainStatus,
        setTrainStatus,
        trainData,
        setTrainData,
        metric,
        setMetric,
        updateMetric,
        compData,
        setCompData,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export { ModelProvider, ModelContext };
