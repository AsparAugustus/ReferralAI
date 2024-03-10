import { healthilyChatEndpoint, searchEndpoint } from "@/config/api";
import { APIResponse, ResponseQuery } from "@/types/api";
import { httpRequest } from "@/utils/http-request";

export const initialQuery = async (
  token: string,
  query: { answer: Record<string, string> } | null
) => {
  const header = {
    Authorization: `Bearer ${token}`,
  };

  const { body, status } = await httpRequest(
    healthilyChatEndpoint,
    query ? query : {},
    header,
    "POST"
  );

  if (status === 400 && query) {
    console.error("Error initating request with query paramters", query.answer);
    const { body } = await httpRequest(
      healthilyChatEndpoint,
      {},
      header,
      "POST"
    );

    return body;
  }

  return body;
};

export const sendResponseQuery = async (
  query: ResponseQuery,
  token: string
) => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const { body } = await httpRequest(
    healthilyChatEndpoint,
    query,
    header,
    "POST"
  );
  return body;
};

export const search = async (query: string, token: string) => {
  const header = {
    Authorization: `Bearer ${token}`,
  };

  const { body } = await httpRequest(
    `${searchEndpoint}?text=${query}`,
    null,
    header,
    "GET"
  );

  return body;
};
