import { useContext } from "react";
import { ModelContext } from "../../contexts/ModelContext";
import SelectInput from "./form-components/SelectInput";
import NumberInput from "./form-components/NumberInput";

export default () => {
  const { trainData, setTrainData } = useContext(ModelContext);

  const onNumberChange = (value, _, target) => {
    setTrainData({ ...trainData, [target.name]: value });
  };

  const onSelectChange = (event) => {
    setTrainData({
      ...trainData,
      [event.currentTarget.name]: event.currentTarget.value === "true",
    });
  };

  return (
    <form>
      <NumberInput
        label="Epochs"
        name="epochs"
        min={1}
        stepSize={1}
        value={trainData.epochs}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
      />

      <NumberInput
        label="Batch Size"
        name="batchSize"
        min={1}
        stepSize={1}
        value={trainData.batchSize}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
      />

      <SelectInput
        label="Shuffle"
        name="shuffle"
        options={["true", "false"]}
        value={trainData.shuffle}
        onChange={onSelectChange}
      />
    </form>
  );
};
