import mongoose from "mongoose";

// sub schema for defense
export const DefenseSchema = new mongoose.Schema({
  type: { type: String, required: true },
  defense: { type: String, required: true },
});
