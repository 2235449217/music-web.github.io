const devBaseURL = "http://123.207.32.32:9002";
const proBaseURL = "http://123.207.32.32:9002";
export const BASE_URL =
  process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;
