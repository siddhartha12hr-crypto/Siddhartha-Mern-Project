# Siddhartha eBook Library - MERN Stack Application

A beautiful, modern, and fully responsive online ebook library built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Read and download books for free!

## 🌟 Features

- **Beautiful Design**: Premium ebook library design with dark green, cream, and golden color scheme
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Hero Slider**: Automatic image slider with 3 beautiful slides
- **Book Categories**: 6 different categories with attractive image cards
- **Popular eBooks**: Display ebooks fetched from MongoDB database
- **Read Online**: Read books directly in your browser
- **Download Books**: Download ebooks in various formats (PDF, EPUB, MOBI)
- **Search Bar**: Search for your favorite ebooks
- **About Section**: Information about the ebook library
- **Professional Footer**: Complete with links, contact info, and social media icons
- **Free Access**: No buying or selling - all books are free to read and download

## 🛠️ Technologies Used

### Frontend
- React.js (with Vite)
- React Icons
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (Community Edition)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
cd "Sidd Proj"
```

### 2. Backend Setup

#### Install Backend Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
The `.env` file is already created with default settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/siddhartha-bookstore
```

**Note**: Make sure MongoDB is running on your system before proceeding.

#### Start MongoDB
On Windows:
```bash
# MongoDB should be running as a service, or start it manually:
mongod
```

On macOS/Linux:
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

#### Seed the Database
```bash
npm run seed
```

This will populate your database with 16 dummy books.

#### Start Backend Server
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window/tab.

#### Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🌐 Access the Application

Once both servers are running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Endpoints**: http://localhost:5000/api/books

## 📁 Project Structure

```
Sidd Proj/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── bookController.js
│   ├── models/
│   │   └── Book.js
│   ├── routes/
│   │   └── bookRoutes.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── PopularBooks.jsx
│   │   │   ├── About.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## 📚 Book Categories

1. Devotional eBooks
2. Entertainment eBooks
3. Self-Help eBooks
4. Money & Finance eBooks
5. Psychology eBooks
6. Educational eBooks

## 🎨 Color Scheme

- **Primary Green**: #1a4d2e
- **Secondary Green**: #2d6a4f
- **Light Green**: #52b788
- **Cream**: #faf3e0
- **Light Cream**: #fff8e7
- **Golden**: #d4a574
- **Dark Golden**: #b8860b

## 🎯 Key Features Explained

### Hero Section
- Automatic image slider that changes every 5 seconds
- Beautiful overlay with call-to-action button
- Smooth fade transitions

### Categories Section
- 6 category cards with hover effects
- Beautiful images with gradient overlays
- Responsive grid layout

### Books Section
- Books fetched from MongoDB via backend API
- Beautiful book cards with images
- Read Online and Download functionality
- Displays title, author, category, format, file size, and pages
- Hover effects and smooth animations

## 🔧 Troubleshooting

### MongoDB Connection Issues
If you get a MongoDB connection error:
1. Make sure MongoDB is installed and running
2. Check if the connection string in `.env` is correct
3. Try connecting to MongoDB using MongoDB Compass to verify it's working

### Port Already in Use
If port 5000 or 3000 is already in use:
1. Change the PORT in `backend/.env`
2. Update the proxy in `frontend/vite.config.js` if you change backend port

### Books Not Loading
1. Make sure the backend server is running
2. Check if the database is seeded (`npm run seed` in backend folder)
3. Open browser console to see any error messages
4. Verify the API is accessible at http://localhost:5000/api/books

## 🚀 Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
The backend is production-ready. Just make sure to:
1. Set proper environment variables
2. Use a production MongoDB instance (like MongoDB Atlas)
3. Use `npm start` instead of `npm run dev`

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## 👨‍💻 Development Notes

- The project uses ES6 modules (`"type": "module"` in package.json)
- React Icons are used for all icons
- Axios handles API requests
- Beautiful fonts from Google Fonts (Playfair Display & Poppins)
- Smooth animations and transitions throughout

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and make improvements!

## 📞 Support

For any questions or issues, please create an issue in the repository.

---

**Happy Reading! 📚✨**

Siddhartha Book Store - Discover Your Next Favorite Book
