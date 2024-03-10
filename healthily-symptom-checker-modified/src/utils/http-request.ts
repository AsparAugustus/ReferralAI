import { APIResponse, AuthResponse, SearchAPIResponse } from "@/types/api";

const healthilyApiKey = process.env.HEALTHILY_API_KEY || "";

export const authRequest = async (
  url: RequestInfo | URL,
  body: {},
  header = {},
) => {
  try {
    const request = new Request(url, {
      method: "POST",
      body: bodyBuilder(body),
      headers: headerBuilder(header),
    });

    const response = await fetch(request);
    const { status } = response;

    const responseBody: AuthResponse | null = hasBody(status)
      ? await response.json()
      : null;

    checkError(status, responseBody);

    return {
      status,
      hasError: hasError(status),
      body: responseBody,
    };
  } catch (error) {
    console.error(
      `HTTP REQUEST ERROR: ${JSON.stringify({
        url,
        message: (error as Error).message,
      })}`,
    );
    throw error;
  }
};

export const httpRequest = async (
  url: RequestInfo | URL,
  body: {} | null = null,
  header = {},
  method = "GET",
) => {
  try {
    const request = new Request(url, {
      method,
      body: bodyBuilder(body),
      headers: headerBuilder(header),
    });

    const response = await fetch(request);
    const { status } = response;

    const responseBody: APIResponse | SearchAPIResponse | null = hasBody(status)
      ? await response.json()
      : null;

    checkError(status, responseBody);

    return {
      status,
      hasError: hasError(status),
      body: responseBody,
    };
  } catch (error) {
    console.error(
      `HTTP REQUEST ERROR: ${JSON.stringify({
        url,
        message: (error as Error).message,
      })}`,
    );
    throw error;
  }
};

const bodyBuilder = (body: {} | null) => (body ? JSON.stringify(body) : null);

const hasBody = (status: number) => status !== 204 && status !== 404;

const hasError = (status: number) => status >= 400;

const checkError = (
  status: number,
  body: APIResponse | SearchAPIResponse | AuthResponse | null = null,
) => {
  if (!hasError(status)) return;
};

const headerBuilder = (headerValues: {}) => {
  let headers = {
    "x-api-key": healthilyApiKey,
    "Content-Type": "application/json",
    ...headerValues,
  };

  return headers;
};
