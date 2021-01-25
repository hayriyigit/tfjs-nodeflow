import { useContext, useState, useEffect } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { Button } from "@blueprintjs/core";
import NumberInput from "./form-components/NumberInput";
import SelectInput from "./form-components/SelectInput";

const padding = ["valid", "same", "causal"];
const dataFormat = ["channelsFirst", "channelsLast"];

export default ({ node }) => {
  const [data, setData] = useState(node.data.args);
  const { updateElement } = useContext(ElementsContext);

  const onNumberChange = (value, _, target) => {
    setData({ ...data, [target.name]: value });
  };

  const onSelectChange = (event) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  useEffect(() => {
    setData(node.data.args);
  }, [node]);

  const onSubmit = (e) => {
    e.preventDefault();
    node.data.args = data;
    updateElement(node);
  };

  return (
    <form onSubmit={onSubmit}>
      <NumberInput
        label="Pool Size"
        name="poolSize"
        min={1}
        stepSize={1}
        value={data.poolSize}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
      />

      <NumberInput
        label="Strides"
        name="strides"
        min={1}
        stepSize={1}
        value={data.strides}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
      />

      <SelectInput
        label="Padding Mode"
        name="padding"
        options={padding}
        value={data.padding}
        onChange={onSelectChange}
      />

      <SelectInput
        label="Data Format"
        name="dataFormat"
        options={dataFormat}
        value={data.dataFormat}
        onChange={onSelectChange}
      />

      <Button type="submit" block>
        Update
      </Button>
    </form>
  );
};
