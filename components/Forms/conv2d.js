import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm, Controller } from "react-hook-form";
import { FormGroup, NumericInput, Button, HTMLSelect } from "@blueprintjs/core";
import { ToastIt } from "../ToastComp";

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

export default () => {
  const { updateElement } = useContext(ElementsContext);
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    node.data.args.kernelSize = parseInt(data.kernelSize);
    node.data.args.filters = parseInt(data.filters);
    node.data.args.strides = parseInt(data.strides);

    updateElement(node);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label={"Filter Size"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="filters"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.filters && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select filter size more than 0", "warning")}
          </div>
        )}
      </FormGroup>

      <FormGroup label={"Kernel Size"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="kernelSize"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.kernelSize && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select Kernel Size size more than 0", "warning")}
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
    </form>
  );
};
