import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
    fetchCart();
  }, [navigate]);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/checkout', shippingInfo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order placed successfully!');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty</div>;

  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cart.items.map(item => (
            <div key={item._id} className="summary-item">
              <span>{item.product.name} x {item.quantity}</span>
              <span>${item.product.price * item.quantity}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total: ${total}</strong>
          </div>
        </div>
        {!paymentUrl ? (
          <form onSubmit={handleSubmit} className="shipping-form">
            <h3>Shipping Information</h3>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                type="text"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary">Proceed to Payment</button>
          </form>
        ) : (
          <div className="payment-section">
            <h3>Payment</h3>
            <p>Please complete your payment using the link below:</p>
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Pay Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
