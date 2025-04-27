import React, { useEffect, useState } from 'react';

const Promo = () => {
  const [balance, setBalance] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-balance');
        const data = await response.json();

        if (data.balance) {
          setBalance(data.balance);
          setCurrency(data.currency);
        } else {
          setError('Error fetching balance');
        }
      } catch (err) {
        console.error('Network Error:', err);
        setError('Network error');
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h1>Promo / Balance Check</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {balance && currency ? (
        <p>Your balance: {balance} {currency}</p>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
};

export default Promo;
