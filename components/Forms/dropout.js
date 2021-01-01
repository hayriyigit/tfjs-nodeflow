import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm, Controller } from "react-hook-form";
import { FormGroup, NumericInput, Button, HTMLSelect } from "@blueprintjs/core";
import { ToastIt } from "../ToastComp";

export default ({ node }) => {
  const { updateElement } = useContext(ElementsContext);

  const { register, handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    node.data.args.rate = parseFloat(data.rate);
    updateElement(node);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label={"Rate"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="rate"
          fill={true}
          defaultValue={null}
          minorStepSize={0.01}
          stepSize={0.01}
          min={0}
          max={1}
          control={control}
          rules={{ required: true, min: 0, max: 1 }}
        />

        {errors.rate && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select rate size between 0 and 1", "warning")}
          </div>
        )}
      </FormGroup>

      <Button type="submit" block>
        Update
      </Button>
    </form>
  );
};
