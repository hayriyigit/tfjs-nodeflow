import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    socket.emit("compileModel", data);
  };

  return (
    <div className="col  p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Compile</legend>
          <div class="form-group">
            <label for="optimizer">Optimizer</label>
            <select
              class="form-control"
              id="optimizer"
              name="optimizer"
              ref={register}
            >
              {optimizers.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>

          <div class="form-group">
            <label for="loss">Loss</label>
            <select class="form-control" id="loss" name="loss" ref={register}>
              {losses.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>

          <button type="submit" class="btn btn-dark btn-block">
            Compile Model
          </button>
        </fieldset>
      </form>
    </div>
  );
};
