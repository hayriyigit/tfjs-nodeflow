import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm, Controller } from "react-hook-form";
import { FormGroup, NumericInput, Button, HTMLSelect } from "@blueprintjs/core";
import { ToastIt } from "../ToastComp";

const dataFormat = ["channelsFirst", "channelsLast"];

export default ({ node }) => {
  const { updateElement } = useContext(ElementsContext);
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => {
    node.data.args.dataFormat = data.dataFormat;
    updateElement(node);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label={"Data Format"} labelInfo={"(required)"}>
        <Controller
          as={<HTMLSelect inputRef={register} />}
          name="dataFormat"
          fill={true}
          options={dataFormat}
          defaultValue="channelsFirst"
          control={control}
          rules={{ required: true }}
        />

        {errors.dataFormat && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select valid data format option", "warning")}
          </div>
        )}
      </FormGroup>

      <Button type="submit" block>
        Update
      </Button>
    </form>
  );
};
