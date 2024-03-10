import Heading from "@/components/Heading";
import Input from "@/components/Question/Input";
import { FormContainer } from "./confirmation.styles";
import ButtonBar from "@/components/Button/ButtonBar";

interface SymptomConfirmationProps {
  symptom: string;
  handleChange: (field: string, value: string) => void;
  handleClick: () => void;
}

const SymptomConfirmation: React.FC<SymptomConfirmationProps> = ({
  symptom,
  handleClick,
  handleChange,
}) => {
  return (
    <>
      <Heading kind="heading" as="h1">
        What symptoms do you have?
      </Heading>
      <Heading as="p" kind="hint">
        Please use short sentences. For example: Headache behind eyes
      </Heading>
      <FormContainer>
        <Input
          value={symptom}
          id="initial_symptom"
          label=""
          onChange={(e) =>
            handleChange("initial_symptom", e?.target.value || "")
          }
        />
      </FormContainer>
      <ButtonBar
        disabled={!symptom}
        onClick={handleClick}
        buttonText="Continue"
      />
    </>
  );
};

export default SymptomConfirmation;
