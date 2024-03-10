import ButtonBar from "@/components/Button/ButtonBar";
import { APIResponse, ResponseQuery } from "@/types/api";

type AnalysisngScreenProps = {
  chatResponse: APIResponse;
  setChatMessage: (query: ResponseQuery) => Promise<void>;
};

const AnalysingScreen: React.FC<AnalysisngScreenProps> = ({
  chatResponse,
  setChatMessage,
}) => {
  const handleClick = (id: string) => {
    const type = chatResponse.question.type;
    const body = {
      answer: {
        type,
        input: {
          exclude: [],
          include: [id],
        },
      },
      conversation: {
        id: chatResponse.conversation.id,
      },
    };

    setChatMessage(body);
  };
  return (
    <>
      <ButtonBar
        disabled={false}
        onClick={() => handleClick("OK")}
        buttonText={"I understand"}
      />
    </>
  );
};

export default AnalysingScreen;
