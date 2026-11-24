import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200',
      title: 'Discover Your Next Favorite eBook',
      subtitle: 'Read and download books that inspire, educate, and entertain.',
    },
    {
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200',
      title: 'Free Access to Knowledge',
      subtitle: 'Explore thousands of ebooks across all genres.',
    },
    {
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200',
      title: 'Read Anytime, Anywhere',
      subtitle: 'Download your favorite books and read offline.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <a href="#books" className="hero-btn">
                Browse eBooks
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
