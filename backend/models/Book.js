import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
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
      required: true,
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

const Book = mongoose.model('Book', bookSchema);

export default Book;
