import mongoose from "mongoose";
import { ItemModifierSchema } from "./ItemModifierSchema";

// Sub-schema for Items
export const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modifier: { type: ItemModifierSchema, required: false },
});
