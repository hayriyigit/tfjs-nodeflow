import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm, Controller } from "react-hook-form";
import { FormGroup, NumericInput, Button, HTMLSelect } from "@blueprintjs/core";
import { ToastIt } from "../ToastComp";

const padding = ["valid", "same", "causal"];
const dataFormat = ["channelsFirst", "channelsLast"];

export default ({ node }) => {
  const { updateElement } = useContext(ElementsContext);

  const { register, handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    node.data.args.poolSize = parseInt(data.poolSize);
    node.data.args.strides = parseInt(data.strides);
    updateElement(node);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label={"Pool Size"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="poolSize"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.poolSize && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select pool size more than 0", "warning")}
          </div>
        )}
      </FormGroup>

      <FormGroup label={"Strides"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="strides"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.strides && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select Stride size more than 0", "warning")}
          </div>
        )}
      </FormGroup>

      <FormGroup label={"Padding Mode"} labelInfo={"(required)"}>
        <Controller
          as={<HTMLSelect inputRef={register} />}
          name="padding"
          fill={true}
          options={padding}
          defaultValue="valid"
          control={control}
          rules={{ required: true }}
        />

        {errors.padding && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select valid padding mode option", "warning")}
          </div>
        )}
      </FormGroup>

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
