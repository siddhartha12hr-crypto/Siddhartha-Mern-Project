import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBookReader, FaDownload } from 'react-icons/fa';

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/books');
      setBooks(response.data.result);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch ebooks. Please make sure the backend server is running.');
      setLoading(false);
      console.error('Error fetching books:', err);
    }
  };

  const handleReadOnline = (book, e) => {
    e.preventDefault();
    if (book.readLink) {
      window.open(book.readLink, '_blank');
    } else {
      alert(`Opening "${book.title}" for reading...`);
    }
  };

  const handleDownload = (book, e) => {
    e.preventDefault();
    if (book.pdfFile) {
      window.open(`http://localhost:5001${book.pdfFile}`, '_blank');
    } else {
      alert(`Download link for "${book.title}" will be available soon.`);
    }
  };

  if (loading) {
    return (
      <section className="section" id="books">
        <div className="container">
          <h2 className="section-title">Popular eBooks</h2>
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section" id="books">
        <div className="container">
          <h2 className="section-title">Popular eBooks</h2>
          <div className="error-message">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="books">
      <div className="container">
        <h2 className="section-title">Popular eBooks</h2>
        <div className="books-grid">
          {books.map((book) => (
            <Link 
              to={`/book/${book.slug || book._id}`} 
              key={book._id} 
              className="book-card-link" 
              data-book-id={book._id}
            >
              <div className="book-card">
                <img 
                  src={book.image.startsWith('http') ? book.image : `http://localhost:5001${book.image}`} 
                  alt={book.title} 
                  className="book-image" 
                />
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-category">{book.category}</p>
                  <div className="book-actions">
                    <button
                      className="read-btn"
                      onClick={(e) => handleReadOnline(book, e)}
                    >
                      <FaBookReader /> Read Online
                    </button>
                    <button
                      className="download-btn"
                      onClick={(e) => handleDownload(book, e)}
                    >
                      <FaDownload /> Download
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
