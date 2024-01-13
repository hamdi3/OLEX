import React from 'react';
import { useAuth } from '../context/AuthContext ';

const HomePage = () => {
  const { clearTokens, user } = useAuth();

  return (
    <div>
      <h1>{user.user_id}</h1>
      <h1>{user.joined_date}</h1>
      <h1>{user.seller ? 'buyer' : 'seller'}</h1>

      <button onClick={clearTokens}>LogOUT</button>
    </div>
  );
};

export default HomePage;
