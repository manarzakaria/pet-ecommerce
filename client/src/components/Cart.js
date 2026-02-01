import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in, proceed to checkout
      navigate('/checkout');
    } else {
      // User is not logged in, redirect to auth page and store cart as redirect destination
      localStorage.setItem('redirectAfterLogin', '/cart');
      navigate('/auth');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Authenticated user: fetch from backend
      try {
        const res = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      // Guest user: load from localStorage
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || { items: [] };
      setCart(guestCart);
    }
    setLoading(false);
  };

  const updateQuantity = async (itemId, quantity) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.put(`http://localhost:5000/api/cart/update/${itemId}`,
          { quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCart();
      } catch (err) {
        console.error(err);
      }
    } else {
      // Guest: update localStorage
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || { items: [] };
      const itemIndex = guestCart.items.findIndex(item => item._id === itemId);
      if (itemIndex !== -1) {
        guestCart.items[itemIndex].quantity = quantity;
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        setCart(guestCart);
      }
    }
  };

  const removeItem = async (itemId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCart();
      } catch (err) {
        console.error(err);
      }
    } else {
      // Guest: remove from localStorage
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || { items: [] };
      guestCart.items = guestCart.items.filter(item => item._id !== itemId);
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      setCart(guestCart);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.product.image} alt={item.product.name} />
            <div>
              <h3>{item.product.name}</h3>
              <p>${item.product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <p>Total: ${cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)}</p>
        <button onClick={handleCheckout} className="btn-primary">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
