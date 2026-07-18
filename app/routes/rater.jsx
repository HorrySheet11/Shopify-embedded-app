import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppBridge } from '@shopify/app-bridge-react';

const Rater = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authenticatedFetch } = useAppBridge();

  // Extract productId from state (if coming from a link with state) or from query params
  const productId = location.state?.productId || new URLSearchParams(location.search).get('productId');

  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      // Use authenticatedFetch for secure requests to your backend
      const response = await authenticatedFetch(`/api/rate-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, rating }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      setSuccess(true);
      // Optionally reset rating after successful submission
      // setRating(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // If no productId is provided, show an error and redirect back
  if (!productId) {
    setError('Product ID is required');
    // Optionally redirect back after a delay
    setTimeout(() => {
      navigate(-1); // Go back
    }, 1500);
  }

  const stars = [1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      onClick={() => handleRating(star)}
      style={{
        cursor: 'pointer',
        fontSize: '2rem',
        color: rating >= star ? '#ffd700' : '#ccc',
        marginRight: '0.5rem',
      }}
      role="button"
      aria-label={`Rate ${star} out of 5`}
    >
      ⭐
    </span>
  ));

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Rate this Product</h2>
      {productId && <p>Product ID: {productId}</p>}
      <div>{stars}</div>
      <p>Your rating: {rating}/5</p>
      {error && <p style={{ color: '#d32f2f' }}>{error}</p>}
      {success && <p style={{ color: '#388e3c' }}>Thank you for your rating!</p>}
      <button
        onClick={handleSubmit}
        disabled={submitting || rating === 0}
        style={{
          backgroundColor: rating === 0 ? '#9e9e9e' : '#1976d2',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1.5rem',
          borderRadius: '4px',
          cursor: rating === 0 ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          marginTop: '1rem',
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? 'Submitting...' : 'Submit Rating'}
      </button>
    </div>
  );
};

export default Rater;