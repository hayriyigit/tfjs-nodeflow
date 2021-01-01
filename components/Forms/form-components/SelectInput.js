import { FormGroup, HTMLSelect } from "@blueprintjs/core";

export default (props) => {
  const { label, value, options, onChange, name } = props;

  return (
    <FormGroup label={label} labelInfo={"(required)"}>
      <HTMLSelect
        fill={true}
        name={name}
        options={options}
        onChange={onChange}
        value={value}
      />
    </FormGroup>
  );
};
