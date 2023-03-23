import dotenv from "dotenv";
dotenv.config();
export const { NODE_ENV } = process.env;
export const TEST_DB = process.env.NODE_ENV !== "test" ? "development" : "test";
