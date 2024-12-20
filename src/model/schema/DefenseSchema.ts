import { Schema } from "mongoose";
import { Defense } from "../interface/defense";

export const DefenseSchema = new Schema<Defense>({
  type: { type: String, required: true },
  defense: { type: String, required: true },
});
