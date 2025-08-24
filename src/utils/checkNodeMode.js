import { env } from "../global/constants.js";

const isDevMode = () => {
  return env.NODE_ENV.toLowerCase() === "development";
};

export { isDevMode };
