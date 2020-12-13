import { createContext, useEffect, useState } from "react";

const ElementsContext = createContext();

const ElementsProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [epoch, setEpoch] = useState(null);
  const [trainStatus, setTrainStatus] = useState(false);
  const [metric, setMetric] = useState({
    loss: [],
    val_loss: [],
  });

  const addElement = (newElement) => {
    try {
      setElements([newElement, ...elements]);
    } catch (e) {
      console.error(e);
    }
  };

  const updateElement = (newElement) => {
    try {
      const els = elements.filter((element) => element.id != newElement.id);
      setElements([newElement, ...els]);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteElement = (delElement) => {
    try {
      const els = elements.filter((element) => element.id != delElement.id);
      setElements([...els]);
    } catch (e) {
      console.error(e);
    }
  };

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
    <ElementsContext.Provider
      value={{
        elements,
        setElements,
        epoch,
        setEpoch,
        trainStatus,
        setTrainStatus,
        metric,
        setMetric,
        updateMetric,
        addElement,
        updateElement,
        deleteElement,
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
};

export { ElementsProvider, ElementsContext };
