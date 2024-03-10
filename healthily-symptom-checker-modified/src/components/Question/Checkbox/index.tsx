import {
  Label,
  StyledCheckbox,
  StyledLabel,
} from "../Checkbox/checkbox.styles";

type CheckboxProps = {
  onChange: () => void;
  id: string;
  name: string;
  checked: boolean;
  label: string;
  simple?: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  onChange,
  id,
  name,
  checked,
  label,
  simple = false,
}) => {
  const handleLabelClick = () => {
    onChange();
  };

  return (
    <>
      <Label simple={simple} onClick={handleLabelClick} id={id}>
        <StyledCheckbox
          type="checkbox"
          id={id}
          name={name}
          value={id}
          onChange={onChange}
          checked={checked}
        />
        <StyledLabel simple={simple} onClick={handleLabelClick}>
          {label}
        </StyledLabel>
      </Label>
    </>
  );
};
