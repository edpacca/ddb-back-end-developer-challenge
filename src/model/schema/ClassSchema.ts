import mongoose from "mongoose";

// Sub-schema for Class
export const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hitDiceValue: { type: Number, required: true },
  classLevel: { type: Number, required: true },
});
