import { Schema } from "mongoose";
import { ItemModifierSchema } from "./ItemModifierSchema";
import { Item } from "../interface/item";

export const ItemSchema = new Schema<Item>({
  name: { type: String, required: true },
  modifier: { type: ItemModifierSchema, required: false },
});
