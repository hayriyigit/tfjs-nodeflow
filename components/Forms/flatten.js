import { useContext } from "react";
import { ElementsContext } from "../../contexts/ElementsContext";
import { useForm } from "react-hook-form";

const dataFormat = ["channelsFirst", "channelsLast"];

export default ({ node }) => {
  const { updateElement } = useContext(ElementsContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    node.data.args.dataFormat = data.dataFormat;
    updateElement(node);
  };

  return (
    <div className="col border p-3 border-danger rounded-lg bg-light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Flatten</legend>

          <div class="form-group">
            <label for="dataFormat">Data Format</label>
            <select
              class="form-control"
              id="dataFormat"
              name="dataFormat"
              defaultValue={node.data.args.dataFormat}
              ref={register}
            >
              {dataFormat.map((item) => (
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
