import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Pet Ecommerce</h1>
        <p>Find the best accessories for your furry friends</p>
        <a href="/products" className="btn-primary">Shop Now</a>
      </div>
    </div>
  );
};

export default Home;
