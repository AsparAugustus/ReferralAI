import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import {
  APIResponse,
  Choice,
  ResponseQuery,
  SearchAPIResponse,
  SearchAutoComplete,
} from "@/types/api";
import AutoComplete from ".";
import ButtonBar from "@/components/Button/ButtonBar";

const MAX_SELECTIONS = 4;

export type ExtendedAutoComplete = SearchAutoComplete & {
  preSelected: boolean;
};

type AutoCompleteLayoutProps = {
  chatResponse: APIResponse;
  sendSearch: (query: string) => Promise<SearchAPIResponse | undefined>;
  setChatMessage: (query: ResponseQuery) => Promise<void>;
};

const AutoCompleteLayout: React.FC<AutoCompleteLayoutProps> = ({
  chatResponse,
  sendSearch,
  setChatMessage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchAutoComplete[]>([]);
  const [preSelectedSymptoms, setPreSelectedSymptoms] = useState<
    SearchAutoComplete[]
  >([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<
    ExtendedAutoComplete[]
  >([]);
  const [symptomPrefix, setSymptomPrefix] = useState("");
  const [userMessage, setErrorMessage] = useState("");

  const { question } = chatResponse;
  const { choices = [], type } = question;

  const isSelectedSymptomsEmpty = (symptoms: SearchAutoComplete[]) =>
    symptoms.length < 1;

  const isDisabled = (choice: Choice) => {
    if (
      choice.id === "empty_id_autocomplete" &&
      isSelectedSymptomsEmpty(selectedSymptoms)
    ) {
      return true;
    }

    if (
      choice.id === "cant_find_symptoms" &&
      !isSelectedSymptomsEmpty(selectedSymptoms)
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const {
      conversation: { symptoms_summary },
    } = chatResponse;

    if (symptoms_summary?.selected) {
      const preSelectedSymptoms = symptoms_summary.selected.map(
        ({ cui, name }) => ({
          cui: cui,
          id: cui,
          user_facing_name: name,
          medical_name: name,
          highlight: "",
        }),
      );

      setPreSelectedSymptoms(preSelectedSymptoms);
    }
  }, []);

  useEffect(() => {
    const fetchResults = async (query: string) => {
      const data = await sendSearch(query);
      if (data) {
        const { user_facing_prefix, autocomplete } = data;
        if (searchTerm.length >= 3 && autocomplete.length === 0) {
          setErrorMessage("We couldn't find a match. Please try a different search term.");
          return false;
        }

        setSymptomPrefix(user_facing_prefix);
        setSearchResults(autocomplete);
      }
    };

    const debouncedFetchResults = debounce(fetchResults, 300);

    if (searchTerm) {
      debouncedFetchResults(searchTerm);
    } else {
      userMessage && setErrorMessage("");
      setSearchResults([]);
    }

    return () => {
      debouncedFetchResults.cancel();
    };
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    console.log("Search: " + event.target.value);

    if (event.target.value !== "")
    {
      setErrorMessage("");
    }

    setSearchTerm(event.target.value);
  };

  const handleResultSelect = (result: any) => {
    if (
      selectedSymptoms.some((symptom) => symptom.cui === result.cui) ||
      preSelectedSymptoms.some((symptom) => symptom.cui === result.cui)
    ) {
      setSearchTerm("");
      setErrorMessage("You've already added this symptom");
      return false;
    }

    console.log('Selected symptoms: ' + (selectedSymptoms.length + preSelectedSymptoms.length));

    if (
      selectedSymptoms.length + preSelectedSymptoms.length ===
      MAX_SELECTIONS
    ) {
      setSearchTerm("");
      return false;
    }

    setSelectedSymptoms([...selectedSymptoms, result]);
    setSearchTerm("");

  };

  const handleResultDeselect = (deselectedResult: any) => {
    const newSelections = selectedSymptoms.filter(
      (result) => result.id !== deselectedResult.id,
    );

    setSelectedSymptoms(newSelections);
    setErrorMessage("");
  };

  const handleClick = (buttonMessage: string) => {
    const includeMessage = choices.filter(
      (choice) => choice.id === buttonMessage,
    );
    const symptomsList = selectedSymptoms.map((symptom) => symptom.id);

    const hasSymptom = (symptomsList: string[]) => symptomsList.length > 0;

    const body = {
      answer: {
        type,
        selection: hasSymptom(symptomsList)
          ? symptomsList
          : includeMessage.map((item) => item.id),
      },
      conversation: {
        id: chatResponse.conversation.id,
      },
    };

    setChatMessage(body);
  };
  const renderButton = () => {
    const buttonText =
      selectedSymptoms.length === 0 ? "Skip this step" : "Add these symptoms";

    return (
      <div key={buttonText}>
        <ButtonBar
          disabled={false}
          onClick={handleClick}
          buttonText={buttonText}
        />
      </div>
    );
  };
  return (
    <>
      <AutoComplete
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        errorMessageTxt={userMessage}
        searchResults={searchResults}
        selectedSymptoms={selectedSymptoms}
        handleResultDeselect={handleResultDeselect}
        handleResultSelect={handleResultSelect}
        symptomPrefix={symptomPrefix}
        preSelectedSymptoms={preSelectedSymptoms}
      />
      {renderButton()}
    </>
  );
};

export default AutoCompleteLayout;
