# File Upload & Book ID Guide

## 🎉 New Features Added!

### 1. ✅ Upload Images Instead of URLs
- Upload book cover images directly from your computer
- Supports: JPG, PNG, GIF, WEBP
- Max size: 5MB
- Files stored in: `backend/public/uploads/images/`

### 2. ✅ Upload PDF Files
- Upload actual PDF ebook files
- Max size: 50MB
- **File size tracked automatically** - no manual input needed!
- Files stored in: `backend/public/uploads/pdfs/`

### 3. ✅ Track Book ID
- Every book gets a unique MongoDB ID
- ID displayed immediately after creating a book
- Use ID to search for specific books

### 4. ✅ Search Books by ID
- Search box at top of admin panel
- Find any book using its unique ID
- Displays book details instantly

### 5. ✅ Keep URL Options
- Can still use image URLs (Unsplash, etc.)
- Can still use readLink for fliphtml5
- Flexible: upload files OR use URLs

---

## 📖 How to Use

### Adding a Book with Uploaded Files

1. **Go to Admin Panel**: http://localhost:3000/admin.html

2. **Fill Basic Info**:
   - Title (required)
   - Author (required)
   - Description (required)
   - Category (dropdown)
   - Format (dropdown)

3. **Upload Cover Image**:
   - Click "Upload Image File" button
   - Select image from your computer
   - OR enter image URL in "OR Image URL" field
   - *(You can use either method)*

4. **Upload PDF (Optional)**:
   - Click "Upload PDF File" button
   - Select PDF from your computer
   - **File size will be calculated automatically!**
   - Shows: `filename.pdf (3.45 MB)`

5. **Add Read Link (Optional)**:
   - Add fliphtml5 link if you have one
   - Leave empty if using uploaded PDF

6. **Click "Add Book to Library"**:
   - Success message appears
   - **Book ID displayed**: e.g., `6b03ed2a659febf95b9f389c`
   - Copy this ID to search for the book later!

---

## 🔍 Searching Books by ID

### In Admin Panel

1. At the top, you'll see "Search Book by ID"
2. Paste the book ID (e.g., `6b03ed2a659febf95b9f389c`)
3. Click "Search" button
4. Book details appear below

### Via API

```bash
# Search by ID
curl "http://localhost:5001/books/search?id=6b03ed2a659febf95b9f389c"

# Or get specific book
curl "http://localhost:5001/books/6b03ed2a659febf95b9f389c"
```

---

## 📂 File Structure

```
backend/
├── public/
│   └── uploads/
│       ├── images/            # Uploaded book covers
│       │   └── image-1234.jpg
│       └── pdfs/              # Uploaded PDF files
│           └── pdfFile-5678.pdf
└── src/
    └── utils/
        └── fileUpload.js      # File upload logic
```

---

## 🌐 Accessing Uploaded Files

Files are served as static files:

- **Images**: `http://localhost:5001/uploads/images/image-1234.jpg`
- **PDFs**: `http://localhost:5001/uploads/pdfs/pdfFile-5678.pdf`

MongoDB stores the path:
```json
{
  "_id": "6b03ed2a659febf95b9f389c",
  "title": "My Book",
  "image": "/uploads/images/image-1234.jpg",
  "pdfFile": "/uploads/pdfs/pdfFile-5678.pdf",
  "fileSize": "3.45 MB"  // ✨ Calculated automatically!
}
```

---

## 🎯 Example: Complete Workflow

### 1. Add a Book with All Features

**Admin Panel Form**:
```
Title: The Art of Programming
Author: Donald Knuth
Description: A comprehensive guide to computer programming
Category: Educational
Format: PDF

Cover Image: [Upload: programming-cover.jpg]
PDF File: [Upload: programming-book.pdf]  ← 25.5 MB (auto-detected!)
Read Link: https://fliphtml5.com/example/book
Pages: 650
```

**Click "Add Book"** → Success! 

**Book ID**: `6b04ff1a823cde89ab123456`

### 2. Search for the Book

In search box: `6b04ff1a823cde89ab123456`

**Result**:
```
The Art of Programming
Author: Donald Knuth
Category: Educational
ID: 6b04ff1a823cde89ab123456
```

### 3. Book Appears on Main Page

- Cover image from uploaded file
- File size: 25.5 MB (auto-calculated)
- Read Online button opens fliphtml5 link
- Download button downloads the PDF

---

## 🔧 Technical Details

### Automatic File Size Calculation

```javascript
// When you upload a PDF, backend automatically:
1. Receives file
2. Reads file.size (in bytes)
3. Converts to readable format (KB, MB, GB)
4. Saves to MongoDB: "fileSize": "25.5 MB"
```

### File Naming

Files are renamed with unique timestamps:
```
Original: my-book.pdf
Stored as: pdfFile-1732456789-123456789.pdf
```

This prevents filename conflicts!

### MongoDB Book Schema

```javascript
{
  _id: ObjectId,           // ✨ Unique ID (auto-generated)
  title: String,
  author: String,
  description: String,
  category: String,
  image: String,           // Path or URL
  pdfFile: String,         // Path to uploaded PDF
  readLink: String,        // Optional fliphtml5 link
  format: String,
  fileSize: String,        // ✨ Auto-calculated!
  pages: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 API Endpoints

### Search by ID
```bash
GET /books/search?id=BOOK_ID
```

### Get All Books
```bash
GET /books
```

### Create Book (with file upload)
```bash
POST /books
Content-Type: multipart/form-data

FormData:
  - title
  - author
  - description
  - category
  - image (file or URL)
  - pdfFile (file)
  - readLink
  - format
  - pages
```

### Get Specific Book
```bash
GET /books/:id
```

### Update Book
```bash
PATCH /books/:id
```

### Delete Book
```bash
DELETE /books/:id
```

---

## ✅ Benefits

1. **No Manual File Size**: Upload PDF, size calculated automatically!
2. **Track Books**: Every book has unique ID for easy searching
3. **Flexible**: Use file uploads OR URLs for images
4. **Organized**: Files stored in proper folders
5. **Search Easily**: Find any book by ID instantly
6. **Keep Both**: Can have both uploaded PDF AND online read link

---

## 📝 Notes

- Image uploads are optional (can use URL instead)
- PDF uploads are optional (can use readLink only)
- File size is ONLY calculated when you upload a PDF
- All uploaded files are publicly accessible
- Book IDs are MongoDB ObjectIds (24 hex characters)

---

**Everything works together seamlessly! Upload files, track IDs, and search easily! 📚✨**
