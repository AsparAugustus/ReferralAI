import { SearchAutoComplete } from "@/types/api";
import {
  Input,
  RemoveButton,
  SymptomsContainer,
  AutoCompleteOverflow,
  StyledList,
  StyledListGroup,
} from "./AutoComplete.styles";
import { CloseIcon } from "./CloseIcon";
import { useEffect } from "react";

const replaceHtmlTags = (text: string) => text.replace(/(<([^>]+)>)/gi, '');

type AutoCompleteProps = {
  searchTerm: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessageTxt: string;
  searchResults: SearchAutoComplete[];
  selectedSymptoms: ExtendedAutoComplete[];
  preSelectedSymptoms: SearchAutoComplete[];
  handleResultSelect: (result: any) => void;
  symptomPrefix: string;
  handleResultDeselect: (deselectedResult: any) => void;
};

type ExtendedAutoComplete = SearchAutoComplete & {
  preSelected: boolean;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({
  searchTerm,
  handleInputChange,
  errorMessageTxt,
  selectedSymptoms,
  searchResults,
  handleResultDeselect,
  handleResultSelect,
  symptomPrefix,
  preSelectedSymptoms,
}) => {

  const isMaxSymptomsSelected = () => {

    if (preSelectedSymptoms.length + selectedSymptoms.length == 4)
    {
      return true;
    }

    return false;
  };

  return (
    <>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        disabled={false}
      />
      <AutoCompleteOverflow>
        <StyledListGroup>
          {searchResults.map((result) => (
            <StyledList
              key={`${result.id}-${result.medical_name}`}
              onClick={() => handleResultSelect(result)}
            >
              {replaceHtmlTags(result.highlight)}
            </StyledList>
          ))}
        </StyledListGroup>
        {isMaxSymptomsSelected() && <p style={{color: "#47b275", fontSize: "small"}}>We don't need any more symptoms. You can continue with the assessment.</p>}
        {!isMaxSymptomsSelected() && <p style={{color: "#47b275", fontSize: "small"}}>{errorMessageTxt}</p>}
        {(!!selectedSymptoms.length || !!preSelectedSymptoms.length) && (
          <AutoCompleteOverflow>
            <h3>Your symptoms:</h3>
            {preSelectedSymptoms.map((symptom) => (
              <SymptomsContainer>
                <p key={symptom.cui}>{symptom.user_facing_name}</p>
              </SymptomsContainer>
            ))}
            {selectedSymptoms.map((result) => (
              <SymptomsContainer key={result.cui}>
                <p>{replaceHtmlTags(result.highlight)}</p>

                <RemoveButton onClick={() => handleResultDeselect(result)}>
                  <CloseIcon />
                </RemoveButton>
              </SymptomsContainer>
            ))}
          </AutoCompleteOverflow>
        )}
      </AutoCompleteOverflow>
    </>
  );
};

export default AutoComplete;
