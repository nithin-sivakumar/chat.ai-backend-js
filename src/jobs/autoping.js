import axios from "axios";
import { env } from "../global/constants.js";

const INTERVAL_MINUTES = 10;

const pingServer = async () => {
  await axios.get(`${env.SERVER_URL}/ping`);
  console.log(`Server pinged successfully at ${new Date().toString()}!`);
};

console.log(`🚀 Auto-pinger has been enabled`);

setInterval(pingServer, INTERVAL_MINUTES * 60 * 1000);
