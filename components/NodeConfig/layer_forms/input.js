import React from "react";
import { useForm } from "react-hook-form";

export default ({ node }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    data.row = parseInt(data.row);
    data.column = parseInt(data.column);
    data.channel = parseInt(data.channel);
  };

  return (
    <div className="col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Input</legend>
          <div class="form-group">
            <fieldset>
              <label class="control-label" for="row">
                Rows
              </label>
              <input
                class={`form-control ${errors.row && "is-invalid"}`}
                id="row"
                name="row"
                type="number"
                defaultValue={node.data.args.row}
                ref={register({ required: true, min: 1 })}
              />

              {errors.row && (
                <div class="invalid-feedback">
                  Please select row size more than 0
                </div>
              )}
            </fieldset>
          </div>

          <div class="form-group">
            <fieldset>
              <label class="control-label" for="column">
                Column
              </label>
              <input
                class={`form-control ${errors.column && "is-invalid"}`}
                id="column"
                name="column"
                type="number"
                defaultValue={node.data.args.column}
                ref={register({ required: true, min: 1 })}
              />
              {errors.column && (
                <div class="invalid-feedback">
                  Please select column size more than 0
                </div>
              )}
            </fieldset>
          </div>

          <div class="form-group">
            <fieldset>
              <label class="control-label" for="channel">
                Channels
              </label>
              <input
                class={`form-control ${errors.channel && "is-invalid"}`}
                id="channel"
                name="channel"
                defaultValue={node.data.args.channel}
                type="number"
                ref={register({ required: true, min: 1 })}
              />
              {errors.channel && (
                <div class="invalid-feedback">
                  Please select channel more than 0
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
