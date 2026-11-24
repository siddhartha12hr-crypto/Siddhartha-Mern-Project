import expressAsyncHandler from "express-async-handler";
import { Book } from "../schema/model.js";
import { formatFileSize } from "../utils/fileUpload.js";
import { generateSlug } from "../utils/slugify.js";

// Create a new book with file uploads
export const createBook = expressAsyncHandler(async (req, res) => {
  const bookData = { ...req.body };

  // Generate slug from title
  if (bookData.title) {
    bookData.slug = generateSlug(bookData.title);
    
    // Ensure slug is unique
    let slugExists = await Book.findOne({ slug: bookData.slug });
    let counter = 1;
    let originalSlug = bookData.slug;
    
    while (slugExists) {
      bookData.slug = `${originalSlug}-${counter}`;
      slugExists = await Book.findOne({ slug: bookData.slug });
      counter++;
    }
  }

  // Handle uploaded image
  if (req.files && req.files.image) {
    bookData.image = `/uploads/images/${req.files.image[0].filename}`;
  }

  // Handle uploaded PDF
  if (req.files && req.files.pdfFile) {
    const pdfFile = req.files.pdfFile[0];
    bookData.pdfFile = `/uploads/pdfs/${pdfFile.filename}`;
    // Automatically calculate file size
    bookData.fileSize = formatFileSize(pdfFile.size);
  }

  const result = await Book.create(bookData);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    result: result,
  });
});

// Get all books
export const readBook = expressAsyncHandler(async (req, res) => {
  const result = await Book.find();
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    result: result,
  });
});

// Get single book by ID or slug
export const readSpecificBook = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  
  let result;
  
  // Check if it's a MongoDB ObjectId (24 hex characters)
  if (/^[a-f\d]{24}$/i.test(id)) {
    result = await Book.findById(id);
  } else {
    // Convert input to lowercase for consistent searching
    const searchInput = id.toLowerCase();
    
    // Try 1: Exact slug match (fastest, most common)
    result = await Book.findOne({ slug: searchInput });
    
    // Try 2: Add hyphens before capital letters (e.g., "AtomicHabits" → "atomic-habits")
    if (!result) {
      const withHyphens = id
        .replace(/([a-z])([A-Z])/g, '$1-$2')  // camelCase: atomicHabits → atomic-Habits
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')  // Handle acronyms: ABCDef → ABC-Def
        .toLowerCase();
      
      result = await Book.findOne({ slug: withHyphens });
    }
    
    // Try 3: Fuzzy match by title (removes hyphens/underscores and compares)
    if (!result) {
      const titleSearch = searchInput.replace(/[-_]/g, ' ');
      result = await Book.findOne({ 
        title: new RegExp(`^${titleSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') 
      });
    }
    
    // Try 4: Search by slug with spaces converted to hyphens
    if (!result) {
      const spacesToHyphens = searchInput.replace(/\s+/g, '-');
      result = await Book.findOne({ slug: spacesToHyphens });
    }
    
    // Try 5: Fallback - find any book where slug contains the search input
    // This handles cases like "ATOMICHABITS" → find "atomic-habits"
    if (!result) {
      const cleanInput = searchInput.replace(/[-\s_]/g, '');
      const books = await Book.find();
      result = books.find(book => {
        const cleanSlug = book.slug.replace(/[-\s_]/g, '');
        return cleanSlug === cleanInput;
      });
    }
  }
  
  if (!result) {
    res.status(404);
    throw new Error('Book not found');
  }

  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    result: result,
  });
});

// Search book by ID (alternative endpoint)
export const searchBookById = expressAsyncHandler(async (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    res.status(400);
    throw new Error('Book ID is required');
  }

  const result = await Book.findById(id);
  
  if (!result) {
    res.status(404);
    throw new Error('Book not found with this ID');
  }

  res.status(200).json({
    success: true,
    message: "Book found successfully",
    result: result,
  });
});

// Update a book
export const updateBookController = expressAsyncHandler(async (req, res) => {
  const bookData = { ...req.body };

  // Update slug if title is changed
  if (bookData.title) {
    const book = await Book.findById(req.params.id);
    if (book && book.title !== bookData.title) {
      bookData.slug = generateSlug(bookData.title);
      
      // Ensure new slug is unique
      let slugExists = await Book.findOne({ slug: bookData.slug, _id: { $ne: req.params.id } });
      let counter = 1;
      let originalSlug = bookData.slug;
      
      while (slugExists) {
        bookData.slug = `${originalSlug}-${counter}`;
        slugExists = await Book.findOne({ slug: bookData.slug, _id: { $ne: req.params.id } });
        counter++;
      }
    }
  }

  // Handle uploaded image
  if (req.files && req.files.image) {
    bookData.image = `/uploads/images/${req.files.image[0].filename}`;
  }

  // Handle uploaded PDF
  if (req.files && req.files.pdfFile) {
    const pdfFile = req.files.pdfFile[0];
    bookData.pdfFile = `/uploads/pdfs/${pdfFile.filename}`;
    bookData.fileSize = formatFileSize(pdfFile.size);
  }

  const result = await Book.findByIdAndUpdate(req.params.id, bookData, {
    new: true,
  });

  if (!result) {
    res.status(404);
    throw new Error('Book not found');
  }

  res.status(201).json({
    success: true,
    message: "Book updated successfully",
    result: result,
  });
});

// Delete a book
export const deleteBook = expressAsyncHandler(async (req, res) => {
  const result = await Book.findByIdAndDelete(req.params.id);

  if (!result) {
    res.status(404);
    throw new Error('Book not found');
  }

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    result: result,
  });
});
