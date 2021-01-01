import { createContext, useState } from "react";

const ModelContext = createContext();

const ModelProvider = ({ children }) => {
  const [createStatus, setCreateStatus] = useState(false);
  const [compileStatus, setCompileStatus] = useState(false);
  const [trainStatus, setTrainStatus] = useState(false);
  const [epoch, setEpoch] = useState(null);
  const [batchSize, setBatchSize] = useState(null);
  const [metric, setMetric] = useState({
    loss: [],
    val_loss: [],
  });

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
        createStatus,
        setCreateStatus,
        compileStatus,
        setCompileStatus,
        batchSize,
        setBatchSize,
        epoch,
        setEpoch,
        trainStatus,
        setTrainStatus,
        metric,
        setMetric,
        updateMetric,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export { ModelProvider, ModelContext };
