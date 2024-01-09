import React from 'react';
import { useAuth } from '../context/AuthContext ';

const HomePage = () => {
  const { clearTokens, user } = useAuth();
  return (
    <div>
      <h2>{user?.user_id}</h2>
      <h4>{user?.joined_date}</h4>
      <button onClick={clearTokens}>LogOUT</button>
    </div>
  );
};

export default HomePage;
