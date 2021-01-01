import { useContext, useState, useEffect } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { Button } from "@blueprintjs/core";
import SelectInput from "./form-components/SelectInput";

const dataFormat = ["channelsFirst", "channelsLast"];

export default ({ node }) => {
  const [data, setData] = useState(node.data.args);
  const { updateElement } = useContext(ElementsContext);

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
