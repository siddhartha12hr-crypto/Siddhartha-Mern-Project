import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import PopularBooks from '../components/PopularBooks';
import About from '../components/About';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="HomePage">
      <Header />
      <Hero />
      <Categories />
      <PopularBooks />
      <About />
      <Footer />
    </div>
  );
}

export default HomePage;
