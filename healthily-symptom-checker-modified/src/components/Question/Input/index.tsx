/* eslint-disable react/display-name */
import { HTMLInputTypeAttribute, forwardRef } from "react";
import {
  InputContainer,
  InputInnerContainer,
  Label,
  Input as StyledInput,
} from "./input.styles";
import DateTime from "@/components/DateTime";

type IInputProps = {
  label: string;
  id: string;
  value: string;
  required?: boolean;
  inline?: boolean;
  inputProps?: {};
  hasError?: boolean;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  onChange: (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  validation?: {};
};

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      id,
      value,
      required = false,
      inline = false,
      inputProps = {},
      hasError = false,
      type = "text",
      disabled = false,
      onChange,
      validation = {},
      ...rest
    },
    ref,
  ) => {

    return (
      <InputContainer className="input-container">
        <InputInnerContainer>
        <StyledInput
            ref={ref}
            id={id}
            type={type}
            value={value}
            placeholder=" "
            required={required}
            aria-invalid={hasError}
            disabled={disabled}
            onChange={onChange}
            inputMode={type === "number" ? "numeric" : "text"}
            maxLength={type === "number" ? 4 : 100}
            minLength={type === "number" ? 4 : 1}
            pattern={type === "number" ? "[0-9]*" : ""}
            {...inputProps}
            {...validation}
            {...rest}
          />

          <Label htmlFor={id} className="input-label">
            {label}
          </Label>
        </InputInnerContainer>
      </InputContainer>
    );
  },
);

export default Input;
