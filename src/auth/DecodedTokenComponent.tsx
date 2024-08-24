import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
  exp: number; // Example payload property
  iat: number;
  [key: string]: any; // Adjust according to the payload structure
}

const DecodeTokenComponent: React.FC = () => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('msal.idtoken'); // Adjust key if necessary

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setDecodedToken(decoded);
        console.log('Decoded Token:', decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('No token found in session storage');
    }
  }, []);

  return (
    <div>
      <h2>Decoded Token</h2>
      {decodedToken ? (
        <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
      ) : (
        <p>No token to display</p>
      )}
    </div>
  );
};

export default DecodeTokenComponent;
