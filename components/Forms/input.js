import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm, Controller } from "react-hook-form";
import { FormGroup, NumericInput, Button } from "@blueprintjs/core";
import { ToastIt } from "../ToastComp";

export default () => {
  const { updateElement } = useContext(ElementsContext);

  const { handleSubmit, control, register, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    node.data.args.row = parseInt(data.row);
    node.data.args.column = parseInt(data.column);
    node.data.args.channel = parseInt(data.channel);
    node.data.args.shape = [
      parseInt(data.row),
      parseInt(data.column),
      parseInt(data.channel),
    ];
    updateElement(node);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label={"Rows"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="row"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.row && (
            <div style={{ display: "none" }}>
              {ToastIt("Please select row size more than 0", "warning")}
            </div>
          ) &&
          console.log(errors)}
      </FormGroup>

      <FormGroup label={"Columns"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="column"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.column && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select column size more than 0", "warning")}
          </div>
        )}
      </FormGroup>

      <FormGroup label={"Channels"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="channel"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.channel && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select channel size more than 0", "warning")}
          </div>
        )}
      </FormGroup>

      <Button type="submit" block>
        Update
      </Button>
    </form>
  );
};
