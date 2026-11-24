import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }

    setSearching(true);
    setNoResults(false);

    try {
      // Check if search query looks like a MongoDB ID (24 hex characters)
      const isMongoId = /^[a-f\d]{24}$/i.test(searchQuery.trim());

      if (isMongoId) {
        // Search by ID - navigate directly to book page
        navigate(`/book/${searchQuery.trim()}`);
        clearSearch();
        return;
      } else {
        // Search by title or author (get all books and filter)
        const response = await axios.get('http://localhost:5001/books');
        const allBooks = response.data.result;
        
        const filtered = allBooks.filter(book => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filtered.length > 0) {
          setSearchResults(filtered);
          setShowResults(true);
          setNoResults(false);
        } else {
          setSearchResults([]);
          setShowResults(true);
          setNoResults(true);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(true);
      setNoResults(true);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    setNoResults(false);
  };

  const goToBook = (bookId, bookSlug) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/book/${bookSlug || bookId}`);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <FaBook className="logo-icon" />
              Siddhartha eBook Library
            </div>
            
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/#books">eBooks</a>
              <a href="/#categories">Categories</a>
              <a href="/#about">About</a>
              <a href="/#contact">Contact</a>
              <a href="/admin.html" className="admin-link">Admin</a>
            </nav>
            
            <div className="header-actions">
              <form onSubmit={handleSearch} className="search-bar">
                <input 
                  type="text" 
                  placeholder="Search by ID, title, or author..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button type="button" onClick={clearSearch} className="clear-btn">
                    <FaTimes />
                  </button>
                )}
                <button type="submit" disabled={searching}>
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="search-overlay" onClick={clearSearch}>
          <div className="search-results-container" onClick={(e) => e.stopPropagation()}>
            <div className="search-results-header">
              <h3>Search Results</h3>
              <button onClick={clearSearch} className="close-results">
                <FaTimes />
              </button>
            </div>
            
            {noResults ? (
              <div className="no-results">
                <p>No books found matching "{searchQuery}"</p>
                <small>Try searching by book ID, title, or author name</small>
              </div>
            ) : (
              <div className="search-results-list">
                {searchResults.map((book) => (
                  <div 
                    key={book._id} 
                    className="search-result-item"
                    onClick={() => goToBook(book._id, book.slug)}
                  >
                    <img 
                      src={book.image.startsWith('http') ? book.image : `http://localhost:5001${book.image}`}
                      alt={book.title}
                      className="result-image"
                    />
                    <div className="result-info">
                      <h4>{book.title}</h4>
                      <p className="result-author">by {book.author}</p>
                      <p className="result-category">{book.category}</p>
                      <p className="result-id">ID: {book._id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
