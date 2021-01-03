import { useContext } from "react";
import { ModelContext } from "../../contexts/ModelContext";
import SelectInput from "./form-components/SelectInput";

const optimizers = [
  "sgd",
  "momentum",
  "adagrad",
  "adadelta",
  "adam",
  "adamax",
  "rmsprop",
];
const losses = [
  "absoluteDifference",
  "computeWeightedLoss",
  "cosineDistance",
  "hingeLoss",
  "huberLoss",
  "logLoss",
  "meanSquaredError",
  "sigmoidCrossEntropy",
  "softmaxCrossEntropy",
  "categoricalCrossentropy",
];

export default () => {
  const { compData, setCompData } = useContext(ModelContext);

  const onSelectChange = (event) => {
    setCompData({
      ...compData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <form>
      <SelectInput
        label="Optimizer Function"
        name="optimizer"
        options={optimizers}
        value={compData.optimizer}
        onChange={onSelectChange}
      />

      <SelectInput
        label="Loss Function"
        name="loss"
        options={losses}
        value={compData.loss}
        onChange={onSelectChange}
      />
    </form>
  );
};
