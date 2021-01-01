import { useForm, Controller } from "react-hook-form";
import { FormGroup, Button, HTMLSelect } from "@blueprintjs/core";
import { ToastIt } from "../ToastComp";

const optimizers = [
  "sgd",
  "momentum",
  "adagrad",
  "adadelta",
  "adam",
  "adamax",
  "rmsprop",
];
const losses = [
  "absoluteDifference",
  "computeWeightedLoss",
  "cosineDistance",
  "hingeLoss",
  "huberLoss",
  "logLoss",
  "meanSquaredError",
  "sigmoidCrossEntropy",
  "softmaxCrossEntropy",
  "categoricalCrossentropy",
];

export default (props) => {
  const { socket } = props;
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => {
    socket.emit("compileModel", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label={"Optimizer"} labelInfo={"(required)"}>
        <Controller
          as={<HTMLSelect inputRef={register} />}
          name="optimizer"
          fill={true}
          options={optimizers}
          defaultValue="sgd"
          control={control}
          rules={{ required: true }}
        />

        {errors.optimizer && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select valid optimizer option", "warning")}
          </div>
        )}
      </FormGroup>

      <FormGroup label={"Loss"} labelInfo={"(required)"}>
        <Controller
          as={<HTMLSelect inputRef={register} />}
          name="loss"
          fill={true}
          options={losses}
          defaultValue="absoluteDifference"
          control={control}
          rules={{ required: true }}
        />

        {errors.loss && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select valid loss option", "warning")}
          </div>
        )}
      </FormGroup>

      <Button type="submit" block>
        Update
      </Button>
    </form>
  );
};
