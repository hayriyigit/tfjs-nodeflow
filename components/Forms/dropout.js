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
    node.data.args = data;
    updateElement(node);
  };

  return (
    <form onSubmit={onSubmit}>
      <NumberInput
        label="Rate"
        name="rate"
        min={0}
        max={1}
        stepSize={0.05}
        value={data.rate}
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
