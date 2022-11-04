import { config } from "dotenv";

config();

export const database = {
  uri: String(process.env.POSTGRES_URI),
};
