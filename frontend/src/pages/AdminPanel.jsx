import React, { useState } from 'react';
import axios from 'axios';
import { FaBook, FaPlus, FaUpload, FaSearch } from 'react-icons/fa';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: 'Devotional',
    imageUrl: '',
    readLink: '',
    format: 'PDF',
    pages: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [createdBookId, setCreatedBookId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const categories = [
    'Devotional',
    'Entertainment',
    'Self-Help',
    'Money & Finance',
    'Psychology',
    'Educational',
  ];

  const formats = ['PDF', 'EPUB', 'MOBI', 'TXT'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    setCreatedBookId('');

    try {
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append image file or URL
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (formData.imageUrl) {
        formDataToSend.append('image', formData.imageUrl);
      }

      // Append PDF file
      if (pdfFile) {
        formDataToSend.append('pdfFile', pdfFile);
      }

      const response = await axios.post('http://localhost:5001/books', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Book added successfully!' });
        setCreatedBookId(response.data.result._id);
        
        // Reset form
        setFormData({
          title: '',
          author: '',
          description: '',
          category: 'Devotional',
          imageUrl: '',
          readLink: '',
          format: 'PDF',
          pages: '',
        });
        setImageFile(null);
        setPdfFile(null);
        // Reset file inputs
        document.getElementById('imageFile').value = '';
        document.getElementById('pdfFile').value = '';
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to add book. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setMessage({ type: 'error', text: 'Please enter a book ID to search' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    setSearchResult(null);

    try {
      const response = await axios.get(`http://localhost:5001/books/search?id=${searchId}`);
      
      if (response.data.success) {
        setSearchResult(response.data.result);
        setMessage({ type: 'success', text: 'Book found!' });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Book not found with this ID' 
      });
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <FaBook className="admin-icon" />
          <h1>Add New eBook</h1>
          <p>Upload files or provide URLs to add a new book to the library</p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <h3>Search Book by ID</h3>
          <div className="search-box">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Book ID (e.g., 6b03ed2a...)"
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn" disabled={loading}>
              <FaSearch /> Search
            </button>
          </div>
          
          {searchResult && (
            <div className="search-result">
              <h4>{searchResult.title}</h4>
              <p><strong>Author:</strong> {searchResult.author}</p>
              <p><strong>Category:</strong> {searchResult.category}</p>
              <p><strong>ID:</strong> {searchResult._id}</p>
            </div>
          )}
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
            {createdBookId && (
              <div className="book-id-display">
                <strong>Book ID:</strong> {createdBookId}
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Book Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author Name *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter book description"
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="format">Format *</label>
              <select
                id="format"
                name="format"
                value={formData.format}
                onChange={handleChange}
                required
              >
                {formats.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="upload-section">
            <h3>Cover Image</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="imageFile">
                  <FaUpload /> Upload Image File
                </label>
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                {imageFile && <span className="file-name">{imageFile.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">OR Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  disabled={imageFile !== null}
                />
              </div>
            </div>
          </div>

          {/* PDF Upload Section */}
          <div className="upload-section">
            <h3>PDF File (Optional - File size will be tracked automatically)</h3>
            <div className="form-group">
              <label htmlFor="pdfFile">
                <FaUpload /> Upload PDF File
              </label>
              <input
                type="file"
                id="pdfFile"
                accept=".pdf"
                onChange={handlePdfChange}
                className="file-input"
              />
              {pdfFile && (
                <span className="file-name">
                  {pdfFile.name} ({(pdfFile.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="readLink">Read Online Link (Optional)</label>
            <input
              type="url"
              id="readLink"
              name="readLink"
              value={formData.readLink}
              onChange={handleChange}
              placeholder="https://fliphtml5.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="pages">Number of Pages</label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              placeholder="e.g., 250"
              min="1"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            <FaPlus />
            {loading ? 'Adding Book...' : 'Add Book to Library'}
          </button>
        </form>

        <div className="admin-footer">
          <a href="/" className="back-link">← Back to Library</a>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
