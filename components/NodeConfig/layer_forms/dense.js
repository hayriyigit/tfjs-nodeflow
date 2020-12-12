import { useContext } from "react";
import { ElementsContext } from "../../../contexts/ElementsContext";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    node.data.args.units = parseInt(data.units);
    updateElement(node);
  };

  return (
    <div className="col border p-3 border-info rounded-lg bg-light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Dense</legend>
          <div class="form-group">
            <fieldset>
              <label class="control-label" for="units">
                Units
              </label>
              <input
                class={`form-control ${errors.units && "is-invalid"}`}
                id="units"
                name="units"
                type="number"
                defaultValue={node.data.args.units}
                placeholder="Units"
                ref={register({ required: true, min: 1 })}
              />

              {errors.units && (
                <div class="invalid-feedback">
                  Please select filter size more than 0
                </div>
              )}
            </fieldset>
          </div>

          <div class="form-group">
            <label for="activation">Activation Function</label>
            <select
              class="form-control"
              id="activation"
              defaultValue={node.data.args.activation}
              name="activation"
              ref={register}
            >
              {activation.map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </div>

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
        </fieldset>
      </form>
    </div>
  );
};
