import { Schema } from "mongoose";

const bookSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        'Devotional',
        'Entertainment',
        'Self-Help',
        'Money & Finance',
        'Psychology',
        'Educational',
      ],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    pdfFile: {
      type: String,
      default: null,
    },
    readLink: {
      type: String,
      default: null,
    },
    format: {
      type: String,
      default: 'PDF',
      enum: ['PDF', 'EPUB', 'MOBI', 'TXT'],
    },
    fileSize: {
      type: String,
      default: '2.5 MB',
    },
    pages: {
      type: Number,
      default: 200,
    },
  },
  {
    timestamps: true,
  }
);

export default bookSchema;
