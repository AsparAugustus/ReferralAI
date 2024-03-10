import { useEffect, useState } from "react";
import { APIResponse, SearchAPIResponse } from "@/types/api";
import { initialQuery, search, sendResponseQuery } from "@/services";

import Messages from "../Messages";
import Question from "../Question";
import Report from "../Report";
import { Header } from "../Header";
import SkeletonLoader from "../Screens/Loading/Skeleton";
import Confirmation, { QueryUserDataType } from "../Screens/Confirmation";
import { getProgressTitle } from "../../utils/progressTitle";
import { LoadingScreen } from "../Screens/Loading/LoadingScreen";
import Logo from "../Logo";

interface DisplayProps {
  token: string;
  query: Record<string, string>;
}

interface ResponseQuery {
  answer: {
    type: string;
    value?: string;
    selection?: string[];
    input?: {
      exclude: string[];
      include: string[];
    };
  };
  conversation: {
    id: string;
  };
}
export const isReportReady = (response: APIResponse) =>
  response.report && response.report.type !== "information";

const Display: React.FC<DisplayProps> = ({ token, query }) => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [response, setResponse] = useState<APIResponse>();
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<APIResponse | null>(null);
  const [confirmationScreen, setConfirmationScreen] = useState(false);
  const [queryUserData, setQueryUserData] = useState<Record<
    string,
    string
  > | null>(null);
  const [phase, setPhase] = useState("");

  const { logo } = query;

  const sendDataWithInitialResponse = async (query: QueryUserDataType) => {
    const initalQuery = { answer: { ...query, type: "entry" } };
    try {
      const response = await initialQuery(token, initalQuery);
      setResponse(response as APIResponse);
      setInitialLoading(false);
      setConfirmationScreen(false);
    } catch (error) {
      console.error("Error doing initial fetch", error);
    }
  };

  useEffect(() => {
    const blankInit = async () => {
      try {
        const response = await initialQuery(token, null);
        setResponse(response as APIResponse);
        setInitialLoading(false);
      } catch (error) {
        console.error("Error doing initial fetch", error);
      }
    };

    const allFields: string[] = [
      "name",
      "year_of_birth",
      "gender",
      "initial_symptom",
    ];

    const usePassedQueryParams = Object.keys(query).some((field) =>
      allFields.includes(field),
    );

    if (usePassedQueryParams) {
      const queryParmsForConfirmation: Record<string, string> =
        allFields.reduce((acc: Record<string, string>, field) => {
          acc[field] = query[field];

          return acc;
        }, {});

      setConfirmationScreen(true);
      setQueryUserData(queryParmsForConfirmation);
    } else {
      blankInit();
    }
  }, []);

  const sendResponse = async (query: ResponseQuery) => {
    setLoading(true);

    try {
      const response = await sendResponseQuery(query, token);

      if (isReportReady(response as APIResponse)) {
        setReportData(response as APIResponse);
      }

      setResponse(response as APIResponse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const sendSearch = async (query: string) => {
    try {
      const response = await search(query, token);

      return response as SearchAPIResponse;
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleBackButton = async (query: ResponseQuery) => {
    setLoading(true);

    try {
      const response = await sendResponseQuery(query, token);
      setResponse(response as APIResponse);
      setLoading(false);
    } catch (error) {
      console.error("Error going back", error);
    }
  };

  useEffect(() => {
    if (response?.conversation?.phase) {
      const newPhase = getProgressTitle(response.conversation.phase);
      setPhase(newPhase);
    }
  }, [response]);

  return (
    <>
      {initialLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {reportData ? (
            <Report reportData={reportData} logo={logo} />
          ) : loading ? (
            <SkeletonLoader />
          ) : confirmationScreen ? (
            <>
              <Header
                phase="About you"
                percentage={response?.conversation?.progress?.percentage ?? 0}
                logo={logo}
              />
              <Confirmation
                queryUserData={queryUserData}
                setChatMessage={sendDataWithInitialResponse}
              />
            </>
          ) : (
            <>
              <Header
                phase={phase}
                percentage={response?.conversation?.progress?.percentage || 0}
                logo={logo}
              />
              <Messages chatResponse={response} />
              <Question
                chatResponse={response}
                setChatMessage={sendResponse}
                handleBackButton={handleBackButton}
                sendSearch={sendSearch}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Display;
