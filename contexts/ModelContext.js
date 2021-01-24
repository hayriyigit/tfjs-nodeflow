import { createContext, useEffect, useState } from "react";

const ModelContext = createContext();

const ModelProvider = ({ children }) => {
  const [trainStatus, setTrainStatus] = useState(false);
  const [layers, setLayers] = useState([]);
  const [weights, setWeights] = useState({});
  const [selectedLayer, setSelectedLayer] = useState("");
  const [compData, setCompData] = useState({
    optimizer: "sgd",
    learningRate: 0,
    loss: "absoluteDifference",
  });
  const [trainData, setTrainData] = useState({
    batchSize: 1,
    epochs: 1,
    callback: false,
    monitor: "val_loss",
    patience: 0,
    shuffle: true,
  });
  const [metric, setMetric] = useState({
    loss: [],
    val_loss: [],
    acc: [],
    val_acc: [],
  });

  const updateMetric = (newMetric) => {
    try {
      const newLoss = [...metric.loss, newMetric.loss];
      const newValLoss = [...metric.val_loss, newMetric.val_loss];
      const newAcc = [...metric.acc, newMetric.acc];
      const newValAcc = [...metric.val_acc, newMetric.val_acc];
      setMetric({
        loss: newLoss,
        val_loss: newValLoss,
        acc: newAcc,
        val_acc: newValAcc,
      });
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
        layers,
        setLayers,
        weights,
        setWeights,
        selectedLayer,
        setSelectedLayer,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export { ModelProvider, ModelContext };
