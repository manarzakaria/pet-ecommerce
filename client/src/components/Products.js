import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Authenticated user: add to backend
      try {
        await axios.post('http://localhost:5000/api/cart/add', { productId, quantity: 1 }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Product added to cart!');
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart');
      }
    } else {
      // Guest user: add to localStorage
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || { items: [] };
      const product = products.find(p => p._id === productId);
      if (product) {
        const existingItem = guestCart.items.find(item => item.product._id === productId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          guestCart.items.push({
            _id: Date.now().toString(), // Generate a unique ID for guest cart
            product: product,
            quantity: 1
          });
        }
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        alert('Product added to cart!');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products">
      <h2>Pet Accessories</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
