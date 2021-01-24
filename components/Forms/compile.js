import { useContext } from "react";
import { ModelContext } from "../../contexts/ModelContext";
import SelectInput from "./form-components/SelectInput";
import NumberInput from "./form-components/NumberInput";

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

  const onNumberChange = (value, _, target) => {
    setCompData({ ...compData, [target.name]: value });
  };

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

      <NumberInput
        label="Learning Rate"
        name="learningRate"
        min={0}
        stepSize={0.001}
        value={compData.learningRate}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
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
