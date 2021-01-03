import { useContext, useState, useEffect } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { Button } from "@blueprintjs/core";
import NumberInput from "./form-components/NumberInput";

export default ({ node }) => {
  const [data, setData] = useState(node.data.args);
  const { updateElement } = useContext(ElementsContext);

  const onNumberChange = (value, _, target) => {
    setData({ ...data, [target.name]: value });
  };

  useEffect(() => {
    setData(node.data.args);
  }, [node]);

  const onSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, shape: [data.row, data.column, data.channel] });
    node.data.args = data;
    updateElement(node);
  };

  return (
    <form onSubmit={onSubmit}>
      <NumberInput
        label="Rows"
        name="row"
        min={1}
        stepSize={1}
        value={data.row}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
      />

      <NumberInput
        label="Column"
        name="column"
        min={1}
        stepSize={1}
        value={data.column}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
      />

      <NumberInput
        label="Channels"
        name="channel"
        min={1}
        stepSize={1}
        value={data.channel}
        onValueChange={(x, y, z) => {
          onNumberChange(x, y, z);
        }}
      />
      <Button type="submit" block>
        Update
      </Button>
    </form>
  );
};
