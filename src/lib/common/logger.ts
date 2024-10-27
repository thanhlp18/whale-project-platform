import { format, transports, createLogger } from "winston";
const { combine, timestamp, json, uncolorize, prettyPrint } = format;

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json(), prettyPrint()),
  transports: [new transports.Console()],
});

export { logger };
