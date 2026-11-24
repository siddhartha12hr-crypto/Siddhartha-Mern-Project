import React from 'react';

const Categories = () => {
  const categories = [
    {
      name: 'Devotional eBooks',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
    },
    {
      name: 'Entertainment eBooks',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    },
    {
      name: 'Self-Help eBooks',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    },
    {
      name: 'Money & Finance eBooks',
      image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400',
    },
    {
      name: 'Psychology eBooks',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    },
    {
      name: 'Educational eBooks',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    },
  ];

  return (
    <section className="section categories" id="categories">
      <div className="container">
        <h2 className="section-title">Browse by Categories</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
