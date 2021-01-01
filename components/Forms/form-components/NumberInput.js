import { FormGroup, NumericInput } from "@blueprintjs/core";

export default (props) => {
  const { label, value, stepSize, min, max, onValueChange, name } = props;

  return (
    <FormGroup label={label} labelInfo={"(required)"}>
      <NumericInput
        fill={true}
        name={name}
        min={min}
        max={max}
        stepSize={stepSize}
        minorStepSize={stepSize}
        onValueChange={onValueChange}
        value={value}
      />
    </FormGroup>
  );
};
