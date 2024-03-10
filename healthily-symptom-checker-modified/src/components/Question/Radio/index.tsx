import { APIResponse } from "@/types/api";
import { Input, Label } from "./radio.styles";

type RadioProps = {
  value: string;
  onChecked: () => void;
  label: string;
  name: string;
  checked: boolean;
};

type RadiosProps = {
  choices: APIResponse["question"]["choices"];
  onChange: ({ id }: { id: string }) => void;
  name: string;
  selectedRadio: string;
};

const Radio: React.FC<RadioProps> = ({
  value,
  onChecked,
  label,
  name,
  checked,
}) => (
  <>
    <Input
      id={`${name}-${value}`}
      type="radio"
      name={name}
      value={value}
      onChange={onChecked}
      checked={checked}
    />
    <Label htmlFor={`${name}-${value}`}>
      <span>{label}</span>
    </Label>
  </>
);

const Radios: React.FC<RadiosProps> = ({
  choices = [],
  onChange,
  name,
  selectedRadio,
}) => (
  <>
    {Array.isArray(choices) &&
      choices.length > 0 &&
      choices.map((choice) => {
        const { id, text = "", label = "" } = choice;
        return (
          <Radio
            key={id}
            value={id}
            onChecked={() => onChange(choice)}
            label={label || text}
            name={name}
            checked={selectedRadio === id}
          />
        );
      })}
  </>
);

export default Radios;
