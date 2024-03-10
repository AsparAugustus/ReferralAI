import { v4 as uuidv4 } from "uuid";
import { healthilyLoginEndpoint } from "@/config/api";
import { authRequest, httpRequest } from "@utils/http-request";
import { AuthResponse } from "@/types/api";

const healthilyApiToken = process.env.HEALTHILY_API_TOKEN || "";

export const getAccessToken = async () => {
  const { body } = await authRequest(
    healthilyLoginEndpoint,
    { id: uuidv4() },
    { Authorization: healthilyApiToken },
  );

  return body?.access_token;
};
