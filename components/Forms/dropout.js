import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm } from "react-hook-form";

export default ({ node }) => {
  const { updateElement } = useContext(ElementsContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    node.data.args.rate = parseFloat(data.rate);
    updateElement(node);
  };

  return (
    <div className="col border p-3 border-dark rounded-lg bg-light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Dropout</legend>
          <div class="form-group">
            <fieldset>
              <label class="control-label" for="rate">
                Rate
              </label>
              <input
                class={`form-control ${errors.rate && "is-invalid"}`}
                id="rate"
                name="rate"
                type="number"
                defaultValue={node.data.args.rate}
                placeholder="Rate"
                step="0.01"
                ref={register({ required: true, min: 0, max: 1 })}
              />

              {errors.rate && (
                <div class="invalid-feedback">
                  Please select the rate between 0 and 1
                </div>
              )}
            </fieldset>
          </div>

          <button type="submit" class="btn btn-warning btn-block">
            Update
          </button>
        </fieldset>
      </form>
    </div>
  );
};
