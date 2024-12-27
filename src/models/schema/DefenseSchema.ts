import { Schema } from "mongoose";
import { Defense } from "../interfaces/defense";

export const DefenseSchema = new Schema<Defense>({
  type: { type: String, required: true },
  defense: { type: String, required: true },
});
