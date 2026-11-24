import { model } from "mongoose";
import bookSchema from "./bookSchema.js";

export const Book = model("books", bookSchema);
