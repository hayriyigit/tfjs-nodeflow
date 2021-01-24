import { useContext, useState } from "react";
import { ModelContext } from "../../contexts/ModelContext";
import SelectInput from "./form-components/SelectInput";
import NumberInput from "./form-components/NumberInput";
import { Checkbox } from "@blueprintjs/core";

export default () => {
  const { trainData, setTrainData } = useContext(ModelContext);
  const [callback, setCallback] = useState(false);

  const onNumberChange = (value, _, target) => {
    setTrainData({ ...trainData, [target.name]: value });
  };

  const onSelectChange = (event) => {
    setTrainData({
      ...trainData,
      [event.currentTarget.name]:
        event.currentTarget.name == "monitor"
          ? event.currentTarget.value
          : event.currentTarget.value === "true",
    });
  };

  const handleCallback = async (e) => {
    setCallback(e.target.checked);
    await setTrainData({
      ...trainData,
      callback: e.target.checked,
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

      <Checkbox
        checked={callback}
        label="Early Stopping"
        defaultChecked={trainData.callback}
        onChange={handleCallback}
      />
      {callback ? (
        <>
          <SelectInput
            label="Monitor"
            name="monitor"
            options={["val_loss", "val_acc"]}
            value={trainData.monitor}
            onChange={onSelectChange}
          />
          <NumberInput
            label="Patience"
            name="patience"
            min={0}
            stepSize={1}
            value={trainData.patience}
            onValueChange={(x, y, z) => {
              onNumberChange(x, y, z);
            }}
          />
        </>
      ) : null}
    </form>
  );
};
