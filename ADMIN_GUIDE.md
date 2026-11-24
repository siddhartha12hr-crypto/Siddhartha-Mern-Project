# Admin Panel Guide

## How to Add Books to the Library

### 1. Access the Admin Panel

Open your browser and go to: **http://localhost:3000/admin.html**

Or click the **"Admin"** button in the navigation bar on the main page.

### 2. Fill in the Book Details

#### Required Fields:
- **Book Title**: The name of the ebook
- **Author Name**: The author's name
- **Description**: A brief description of the book
- **Category**: Select from dropdown (Devotional, Entertainment, Self-Help, etc.)
- **Cover Image URL**: URL to the book cover image (use Unsplash or any image hosting)
- **Format**: PDF, EPUB, MOBI, or TXT

#### Optional Fields:
- **Read Online Link**: Link to fliphtml5 or any online reader (like the ones you've been adding)
- **File Size**: e.g., "3.5 MB"
- **Number of Pages**: e.g., 250

### 3. Click "Add Book to Library"

The book will be instantly added to your MongoDB database and appear on the main library page!

## Project Structure (Reorganized to Match MERN Folder)

```
backend/
├── src/
│   ├── connectToDb/
│   │   └── connectToDb.js      # MongoDB connection
│   ├── controller/
│   │   └── bookController.js   # API logic (create, read, update, delete)
│   ├── routes/
│   │   └── bookRouter.js       # API routes
│   └── schema/
│       ├── bookSchema.js       # Book data structure
│       └── model.js            # Mongoose model
├── server.js                   # Main server file
└── package.json

frontend/
├── src/
│   ├── components/             # Reusable components
│   ├── pages/
│   │   └── AdminPanel.jsx      # Admin form to add books
│   ├── App.jsx                 # Main app
│   ├── AdminApp.jsx            # Admin app
│   ├── main.jsx                # Main entry
│   ├── admin.jsx               # Admin entry
│   ├── index.css               # Main styles
│   └── admin.css               # Admin styles
├── index.html                  # Main page
├── admin.html                  # Admin page
└── package.json
```

## MongoDB Connection

Super simple! Just one file:

**backend/src/connectToDb/connectToDb.js**
```javascript
import mongoose from "mongoose";

const connectToDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/siddhartha-ebooks");
  console.log("Connected to MongoDB");
};

export default connectToDb;
```

## API Endpoints

Base URL: `http://localhost:5001`

- `GET /books` - Get all books
- `POST /books` - Create a new book
- `GET /books/:id` - Get a specific book
- `PATCH /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

### Example: Add a Book via API (Alternative Method)

```bash
curl -X POST http://localhost:5001/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Book",
    "author": "Author Name",
    "description": "Book description",
    "category": "Self-Help",
    "image": "https://example.com/image.jpg",
    "readLink": "https://fliphtml5.com/...",
    "format": "PDF",
    "fileSize": "3 MB",
    "pages": 200
  }'
```

## Running the Application

### Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on: http://localhost:5001

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Main page: http://localhost:3000
Admin panel: http://localhost:3000/admin.html

## Quick Tips

1. **Adding Books**: Use the admin panel - it's the easiest way!
2. **Image URLs**: Use https://images.unsplash.com for free book images
3. **Read Links**: Add your fliphtml5 links in the "Read Online Link" field
4. **Testing**: After adding a book, go back to the main page to see it appear

## What's Different from the MERN Folder?

✅ **Same Structure**: Backend uses `src/` folder structure like MERN
✅ **Same Connection**: Simple `connectToDb()` function
✅ **Same Controllers**: Uses `express-async-handler`
✅ **Same Routes**: Clean router setup
✅ **Added**: Beautiful admin panel with form validation
✅ **Added**: More book fields (description, readLink, format, etc.)

---

**Everything is now organized exactly like your MERN folder, with the added bonus of a beautiful admin panel! 📚✨**
