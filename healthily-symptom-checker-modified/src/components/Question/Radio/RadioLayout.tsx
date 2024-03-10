import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIResponse, ResponseQuery } from "@/types/api";
import Radios from "@components/Question/Radio";
import { OverflowContainer } from "./radio.styles";
import ButtonBar from "@/components/Button/ButtonBar";
import { Button } from "@/components/Button";
import { isNoSymptomFoundScreen } from "@/utils/chatbot";

type RadioProps = {
  choices: APIResponse["question"]["choices"];
  buttonText: string;
  chatResponse: APIResponse;
  setChatMessage: (query: ResponseQuery) => Promise<void>;
  handleBackButton: (query: ResponseQuery) => Promise<void>;
};

const RadioLayout: React.FC<RadioProps> = ({
  choices = [],
  buttonText,
  chatResponse,
  setChatMessage,
  handleBackButton,
}) => {
  const [checkedRadio, setCheckedRadio] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [overflowEnabled, setOverflowEnabled] = useState(false);
  const type = chatResponse.question.type;
  const router = useRouter();

  const handleChange = ({ id }: { id: string }) => setCheckedRadio(id);

  const handleClick = async () => {
    setCheckedRadio("");

    const exclude = choices.filter((choice) => choice.id !== checkedRadio);
    const include = choices.filter((choice) => choice.id === checkedRadio);
    const isAnswerTypeGeneric = type === "generic";

    const answerInputs = isAnswerTypeGeneric
      ? {
          input: {
            exclude: exclude.map((item) => item.id),
            include: include.map((item) => item.id),
          },
        }
      : {
          selection: include.map((item) => item.id),
        };

    const body = {
      answer: {
        type,
        ...answerInputs,
      },
      conversation: {
        id: chatResponse.conversation.id,
      },
    };
    if (checkedRadio.length > 0) {
      setButtonDisabled(false);
    }
    setChatMessage(body);
  };

  const handleBackButtonClick = () => {
    const body = {
      answer: {
        type: "step_back",
      },
      conversation: {
        id: chatResponse.conversation.id,
      },
    };

    handleBackButton(body);
  };

  /*useEffect(() => {
    const preSelected = chatResponse.question.choices?.find(
      (choice) => choice.preselect,
    );

    if (preSelected) {
      setCheckedRadio(preSelected.id);
    }
  }, [chatResponse]);*/

  useEffect(() => {
    setButtonDisabled(!checkedRadio.length);
  }, [checkedRadio]);

  useEffect(() => {
    if (choices.length > 4) {
      setOverflowEnabled(true);
    }
  }, []);

  if (isNoSymptomFoundScreen(chatResponse.conversation.phase)) {
    return (
      <Button onClick={() => router.reload()} fullWidth>
        Start a new consultation
      </Button>
    );
  }

  return (
    <>
      <OverflowContainer overflowEnabled={overflowEnabled}>
        <Radios
          choices={choices}
          onChange={handleChange}
          name={type}
          selectedRadio={checkedRadio}
        />
      </OverflowContainer>

      <ButtonBar
        disabled={buttonDisabled}
        onClick={handleClick}
        buttonText="Continue"
        backButtonShow={chatResponse.conversation.step_back_possible}
        handleBackButton={handleBackButtonClick}
      />
    </>
  );
};

export default RadioLayout;
