import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaBookReader, FaDownload, FaBook, FaUser, FaTag, FaFileAlt, FaCalendar } from 'react-icons/fa';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5001/books/${id}`);
      if (response.data.success) {
        setBook(response.data.result);
      }
    } catch (err) {
      setError('Book not found. Please check the ID and try again.');
      console.error('Error fetching book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReadOnline = () => {
    if (book.readLink) {
      window.open(book.readLink, '_blank');
    } else {
      alert('Read online link not available for this book.');
    }
  };

  const handleDownload = () => {
    if (book.pdfFile) {
      window.open(`http://localhost:5001${book.pdfFile}`, '_blank');
    } else {
      alert('Download not available for this book.');
    }
  };

  const goBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="book-detail-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="book-detail-page">
        <div className="container">
          <div className="error-container">
            <h1>Book Not Found</h1>
            <p>{error}</p>
            <button onClick={goBack} className="back-btn">
              <FaArrowLeft /> Back to Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      {/* Header */}
      <div className="detail-header">
        <div className="container">
          <button onClick={goBack} className="back-button">
            <FaArrowLeft /> Back to Library
          </button>
        </div>
      </div>

      {/* Book Detail Content */}
      <div className="container">
        <div className="book-detail-content">
          {/* Book Cover Section */}
          <div className="book-cover-section">
            <img
              src={book.image.startsWith('http') ? book.image : `http://localhost:5001${book.image}`}
              alt={book.title}
              className="detail-book-image"
            />
            <div className="action-buttons">
              <button className="read-online-btn" onClick={handleReadOnline}>
                <FaBookReader /> Read Online
              </button>
              <button className="download-pdf-btn" onClick={handleDownload}>
                <FaDownload /> Download PDF
              </button>
            </div>
          </div>

          {/* Book Information Section */}
          <div className="book-info-section">
            <div className="book-category-badge">{book.category}</div>
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">
              <FaUser /> by {book.author}
            </p>

            <div className="book-meta-info">
              <div className="meta-item">
                <FaTag className="meta-icon" />
                <span className="meta-label">Format:</span>
                <span className="meta-value">{book.format || 'PDF'}</span>
              </div>
              
              {book.fileSize && (
                <div className="meta-item">
                  <FaFileAlt className="meta-icon" />
                  <span className="meta-label">File Size:</span>
                  <span className="meta-value">{book.fileSize}</span>
                </div>
              )}

              {book.pages && (
                <div className="meta-item">
                  <FaBook className="meta-icon" />
                  <span className="meta-label">Pages:</span>
                  <span className="meta-value">{book.pages}</span>
                </div>
              )}

              <div className="meta-item">
                <FaCalendar className="meta-icon" />
                <span className="meta-label">Added:</span>
                <span className="meta-value">
                  {new Date(book.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className="book-description-section">
              <h2>About This Book</h2>
              <p className="book-description">{book.description}</p>
            </div>

            <div className="book-id-section">
              <h3>Book ID</h3>
              <div className="book-id-display">
                <code>{book._id}</code>
                <button
                  className="copy-id-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(book._id);
                    alert('Book ID copied to clipboard!');
                  }}
                >
                  Copy ID
                </button>
              </div>
              <p className="id-help">Use this ID to search or share this book directly</p>
            </div>

            {book.readLink && (
              <div className="read-link-section">
                <h3>Online Reading Link</h3>
                <a href={book.readLink} target="_blank" rel="noopener noreferrer" className="online-link">
                  {book.readLink}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
