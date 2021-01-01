import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm, Controller } from "react-hook-form";
import { FormGroup, NumericInput, Button, HTMLSelect } from "@blueprintjs/core";
import { ToastIt } from "../ToastComp";

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
  const { updateElement } = useContext(ElementsContext);
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => {
    node.data.args.units = parseInt(data.units);
    updateElement(node);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label={"Units"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="units"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.units && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select unit size more than 0", "warning")}
          </div>
        )}
      </FormGroup>

      <FormGroup label={"Activation Function"} labelInfo={"(required)"}>
        <Controller
          as={<HTMLSelect inputRef={register} />}
          name="activation"
          fill={true}
          options={activation}
          defaultValue="elu"
          control={control}
          rules={{ required: true }}
        />

        {errors.activation && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select valid activation option", "warning")}
          </div>
        )}
      </FormGroup>

      <FormGroup label={"Kernel Initializer"} labelInfo={"(required)"}>
        <Controller
          as={<HTMLSelect inputRef={register} />}
          name="kernelInitializer"
          fill={true}
          options={kernelInitializer}
          defaultValue="glorotNormal"
          control={control}
          rules={{ required: true }}
        />

        {errors.kernelInitializer && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select valid activation option", "warning")}
          </div>
        )}
      </FormGroup>

      <Button type="submit" block>
        Update
      </Button>
      {/* 

          

          <div class="form-group">
            <label for="kernelInitializer">Kernel Initializer</label>
            <select
              class="form-control"
              id="kernelInitializer"
              name="kernelInitializer"
              defaultValue={node.data.args.kernelInitializer}
              ref={register}
            >
              {kernelInitializer.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>

          <button type="submit" class="btn btn-warning btn-block">
            Update
          </button>
        </fieldset> */}
    </form>
  );
};
