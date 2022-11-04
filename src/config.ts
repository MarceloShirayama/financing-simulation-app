import { config } from "dotenv";

config();

export const configApp = {
  database: {
    uri: String(process.env.POSTGRES_URI),
  },
};
