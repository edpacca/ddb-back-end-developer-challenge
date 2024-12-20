import { Schema } from "mongoose";
import { ItemModifier } from "../interface/itemModifier";

export const ItemModifierSchema = new Schema<ItemModifier>({
  affectedObject: { type: String, required: true },
  affectedValue: { type: String, required: true },
  value: { type: Number, required: true },
});
