import { useForm } from "react-hook-form";

export default (props) => {
  const { socket } = props;
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    data.batchSize = parseInt(data.batchSize);
    data.epochs = parseInt(data.epochs);
    data.shuffle = data.shuffle == "true" ? true : false;
    socket.emit("trainModel", data);
  };

  return (
    <div className="col border p-3 border-success rounded-lg bg-light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Train Model</legend>
          <div class="form-group">
            <fieldset>
              <label class="control-label" for="batchSize">
                Batch Size
              </label>
              <input
                class={`form-control ${errors.batchSize && "is-invalid"}`}
                id="batchSize"
                name="batchSize"
                type="number"
                placeholder="Batch Size"
                ref={register({ required: true, min: 1 })}
              />

              {errors.batchSize && (
                <div class="invalid-feedback">
                  Please select batch size size more than 0
                </div>
              )}
            </fieldset>
          </div>

          <div class="form-group">
            <fieldset>
              <label class="control-label" for="epochs">
                Epochs
              </label>
              <input
                class={`form-control ${errors.epochs && "is-invalid"}`}
                id="epochs"
                name="epochs"
                type="number"
                placeholder="Strides"
                ref={register({ required: true, min: 1 })}
              />
              {errors.epochs && (
                <div class="invalid-feedback">
                  Please select epochs more than 0
                </div>
              )}
            </fieldset>
          </div>

          <div class="form-group">
            <label for="shuffle">Shuffle</label>
            <select
              class="form-control"
              id="shuffle"
              name="shuffle"
              ref={register}
            >
              <option>true</option>
              <option>false</option>
            </select>
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block ">
            Train Model
          </button>
        </fieldset>
      </form>
    </div>
  );
};
