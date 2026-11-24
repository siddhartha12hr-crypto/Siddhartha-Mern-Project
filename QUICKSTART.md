# 🚀 Quick Start Guide - Siddhartha Book Store

## Step-by-Step Setup (5 minutes)

### Step 1: Ensure MongoDB is Running ✅

**Windows:**
```bash
# Check if MongoDB service is running
sc query MongoDB

# If not running, start it:
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

### Step 2: Setup Backend 🔧

Open a terminal in the project root:

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Seed the database with dummy books
npm run seed

# Start the backend server
npm run dev
```

✅ You should see: "Server is running on port 5000" and "MongoDB Connected"

### Step 3: Setup Frontend 🎨

Open a NEW terminal (keep backend running):

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
```

✅ You should see: "Local: http://localhost:3000"

### Step 4: Open in Browser 🌐

Visit: **http://localhost:3000**

You should see the beautiful Siddhartha Book Store with:
- ✅ Navigation header
- ✅ Hero slider with 3 slides
- ✅ 6 category cards
- ✅ 16 books displayed from database
- ✅ About section
- ✅ Footer

## 🎉 That's It!

Your MERN stack bookstore is now running!

## Common Issues & Solutions 🔧

### ❌ "MongoDB connection failed"
**Solution:** Make sure MongoDB is installed and running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### ❌ "Port 5000 already in use"
**Solution:** Change port in `backend/.env`:
```
PORT=5001
```
Then update `frontend/vite.config.js` proxy target to match.

### ❌ "Books not loading"
**Solution:** 
1. Make sure backend is running (check terminal)
2. Reseed database: `cd backend && npm run seed`
3. Check http://localhost:5000/api/books in browser

### ❌ "Cannot find module"
**Solution:** Delete node_modules and reinstall:
```bash
# In backend
rm -rf node_modules
npm install

# In frontend
rm -rf node_modules
npm install
```

## 📦 What You Have

- ✅ Full MERN Stack Application
- ✅ Beautiful Responsive Design
- ✅ MongoDB Database with 16 Books
- ✅ REST API with 5 endpoints
- ✅ React Frontend with 6 Components
- ✅ Hero Slider with Auto-rotation
- ✅ 6 Book Categories
- ✅ Shopping Cart Functionality
- ✅ Search Bar
- ✅ Professional Footer

## 🎯 Next Steps

- Customize the books in `backend/seed.js`
- Add more categories
- Implement actual shopping cart storage
- Add user authentication
- Deploy to production

---

**Enjoy building with Siddhartha Book Store! 📚✨**
