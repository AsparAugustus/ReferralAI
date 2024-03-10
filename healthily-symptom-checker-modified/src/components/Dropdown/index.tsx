import React, { useState } from "react";
import Image from "next/image";
import {
  Container,
  DropdownList,
  Label,
  Option,
  SelectedOption,
  SelectedOptionContainer,
} from "./dropdown.styles";
import ChevronDown from "../../media/chevron-down.svg";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  label: string;
  onSelect: (option: Option) => void;
  queryParamOption: Option;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  queryParamOption,
  label,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(queryParamOption.label);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option.label);
    setDropdownOpen(false);
    onSelect(option);
  };

  return (
    <Container>
      <div onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <Label>{label}</Label>
        <SelectedOptionContainer>
          <SelectedOption>
            {selectedOption || "Select an option"}
          </SelectedOption>
          <Image src={ChevronDown} alt="chevron-down" />
        </SelectedOptionContainer>
      </div>

      {isDropdownOpen && (
        <DropdownList>
          {options.map((option) => (
            <Option
              active={selectedOption === option.label}
              key={option.label}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </Option>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default Dropdown;
