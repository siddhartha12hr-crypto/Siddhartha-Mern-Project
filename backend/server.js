import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectToDb from './src/connectToDb/connectToDb.js';
import bookRouter from './src/routes/bookRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images and PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/books', bookRouter);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Siddhartha eBook Library API' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`<---- Application is listening at ${PORT} ---->`);
  connectToDb();
});
