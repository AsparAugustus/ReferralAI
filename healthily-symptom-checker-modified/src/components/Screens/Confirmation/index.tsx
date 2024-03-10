import { useEffect, useState } from "react";
import DetailsConfirmation from "./DetailsConfirmation";
import SymptomConfirmation from "./SymptomConfirmation";

interface ConfirmationProps {
  queryUserData: QueryUserDataType | null;
  setChatMessage: (query: any) => Promise<void>;
}

export interface QueryUserDataType {
  [key: string]: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  queryUserData,
  setChatMessage,
}) => {
  if (!queryUserData) return null;
  const [response, setResponse] = useState<QueryUserDataType>();
  const [showDetailsConfirmation, setShowDetailsConfirmation] = useState(true);
  const [confirmationFormFields, setConfirmationFormFields] = useState<
    QueryUserDataType | undefined
  >();
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    const formFieldsToShow = { ...queryUserData };
    delete formFieldsToShow["initial_symptom"];

    if (!isUserValidYearOfBirth(queryUserData['year_of_birth']))
    {
      setBtnDisabled(true);
    }

    setConfirmationFormFields(formFieldsToShow);
    setResponse(queryUserData);
  }, [queryUserData]);

  const handleDetailsChange = (field: string, value: string) => {
    const newFormData = { ...response, [field]: value };

    if (field == "year_of_birth" && !isUserValidYearOfBirth(value)) {
      setBtnDisabled(true);
    }
    else {
      setBtnDisabled(false);
    }

    setResponse(newFormData);
  };

  const handleFormSubmit = () => {
    const chatResponse = { ...response };
    setChatMessage(chatResponse);
  };

  const handleDetailsClick = () => {
    setShowDetailsConfirmation(false);
  };

  const currentYear = new Date().getFullYear();
  const maxUserYear = currentYear - 16;
  const minUserYear = 1900;

  const isUserValidYearOfBirth = (inputValue: string) => {
    const usersYearOfBirth = parseInt(inputValue, 10);
    if (isNaN(usersYearOfBirth)) {
      return false;
    }
    if (usersYearOfBirth < minUserYear || usersYearOfBirth > maxUserYear) {
      return false;
    } else return true;
  };

  return (
    <>
      {showDetailsConfirmation ? (
        <DetailsConfirmation
          inputsToShow={confirmationFormFields}
          formData={response}
          btnDisabled={btnDisabled}
          handleChange={handleDetailsChange}
          handleClick={handleDetailsClick}
        />
      ) : (
        <SymptomConfirmation
          symptom={response?.["initial_symptom"] || ""}
          handleChange={handleDetailsChange}
          handleClick={handleFormSubmit}
        />
      )}
    </>
  );
};

export default Confirmation;
