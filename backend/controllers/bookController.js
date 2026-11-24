import Book from '../models/Book.js';

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, description, category, image, readLink, format, fileSize, pages } = req.body;
    
    const book = new Book({
      title,
      author,
      description,
      category,
      image,
      readLink,
      format,
      fileSize,
      pages,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a book
export const updateBook = async (req, res) => {
  try {
    const { title, author, description, category, image, readLink, format, fileSize, pages } = req.body;
    
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.description = description || book.description;
      book.category = category || book.category;
      book.image = image || book.image;
      book.readLink = readLink !== undefined ? readLink : book.readLink;
      book.format = format || book.format;
      book.fileSize = fileSize || book.fileSize;
      book.pages = pages !== undefined ? pages : book.pages;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await Book.deleteOne({ _id: req.params.id });
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
