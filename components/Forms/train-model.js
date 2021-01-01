import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm, Controller } from "react-hook-form";
import {
  FormGroup,
  NumericInput,
  Button,
  Switch,
  Alignment,
} from "@blueprintjs/core";
import { ToastIt } from "../ToastComp";

export default (props) => {
  const { socket } = props;
  const { setEpoch, setTrainStatus } = useContext(ElementsContext);
  const { register, handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    data.batchSize = parseInt(data.batchSize);
    data.epochs = parseInt(data.epochs);
    data.shuffle = data.shuffle == "true" ? true : false;
    setEpoch(data.epochs);
    setTrainStatus(true);
    socket.emit("trainModel", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label={"Batch Size"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="batchSize"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.batchSize && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select batch size more than 0", "warning")}
          </div>
        )}
      </FormGroup>

      <FormGroup label={"Epochs"} labelInfo={"(required)"}>
        <Controller
          as={<NumericInput inputRef={register} />}
          name="epochs"
          fill={true}
          min={1}
          defaultValue={null}
          control={control}
          rules={{ required: true, min: 1 }}
        />

        {errors.epochs && (
          <div style={{ display: "none" }}>
            {ToastIt("Please select epoch size more than 0", "warning")}
          </div>
        )}
      </FormGroup>
      <FormGroup>
        <Switch
          name="shuffle"
          label="Shuffle"
          innerLabel="false"
          innerLabelChecked="true"
          defaultChecked={true}
          large={true}
          alignIndicator={Alignment.RIGHT}
          inputRef={register}
        />
      </FormGroup>

      <Button type="submit" block>
        Update
      </Button>
    </form>
  );
};
