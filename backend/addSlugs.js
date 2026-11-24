import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Book } from './src/schema/model.js';
import connectToDb from './src/connectToDb/connectToDb.js';
import { generateSlug } from './src/utils/slugify.js';

dotenv.config();

const addSlugsToBooks = async () => {
  try {
    await connectToDb();
    
    const books = await Book.find({ $or: [{ slug: null }, { slug: { $exists: false } }] });
    
    console.log(`Found ${books.length} books without slugs`);
    
    for (const book of books) {
      let slug = generateSlug(book.title);
      
      // Check if slug exists
      let existingBook = await Book.findOne({ slug, _id: { $ne: book._id } });
      let counter = 1;
      let originalSlug = slug;
      
      while (existingBook) {
        slug = `${originalSlug}-${counter}`;
        existingBook = await Book.findOne({ slug, _id: { $ne: book._id } });
        counter++;
      }
      
      book.slug = slug;
      await book.save();
      console.log(`✓ Added slug "${slug}" to "${book.title}"`);
    }
    
    console.log('\n✅ All slugs added successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

addSlugsToBooks();
