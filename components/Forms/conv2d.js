import { useContext, useState, useEffect } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { Button } from "@blueprintjs/core";
import NumberInput from "./form-components/NumberInput";
import SelectInput from "./form-components/SelectInput";

const padding = ["valid", "same", "causal"];
const activation = [
  "elu",
  "hardSigmoid",
  "linear",
  "relu",
  "relu6",
  "selu",
  "sigmoid",
  "softmax",
  "softplus",
  "softsign",
  "tanh",
];
const kernelInitializer = [
  "glorotNormal",
  "glorotUniform",
  "heNormal",
  "heUniform",
  "leCunNormal",
  "leCunUniform",
  "ones",
  "zeros",
];

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
        label="Filter Size"
        name="filters"
        min={1}
        stepSize={1}
        value={data.filters}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
      />

      <NumberInput
        label="Kernel Size"
        name="kernelSize"
        min={1}
        stepSize={1}
        value={data.kernelSize}
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
        label="Activation Function"
        name="activation"
        options={activation}
        value={data.activation}
        onChange={onSelectChange}
      />

      <SelectInput
        label="Kernel Initializer"
        name="kernelInitializer"
        options={kernelInitializer}
        value={data.kernelInitializer}
        onChange={onSelectChange}
      />

      <Button type="submit" block>
        Update
      </Button>
    </form>
  );
};
