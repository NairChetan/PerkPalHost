import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';

const SendDecodedTokenToBackend: React.FC = () => {
  const [decodedToken, setDecodedToken] = useState<any>(null);
  useEffect(() => {
    const secretKey = sessionStorage.getItem('msal.idtoken');
    
    console.log('Retrieved secret key:', secretKey); // Log the secret key
    
    if (secretKey) {
      try {
        const decoded = jwtDecode(secretKey);
        console.log('Decoded token:', decoded); // Log the decoded token
        setDecodedToken(decoded);
  
        axios.post('http://localhost:8080/api/v1/authenticate', decoded, {
          headers: {
            Authorization: `Bearer ${secretKey}`
          }
        })
        .then(response => {
          console.log('Backend response:', response.data);
        })
        .catch(error => {
          console.error('Error sending decoded token to backend:', error);
        });
      } catch (error) {
        console.error('Error decoding JWT:', error); // Log any decoding error
      }
    } else {
      console.error('Secret key not found in session storage');
    }
  }, []);
  

  useEffect(() => {
    const secretKey = sessionStorage.getItem('msal.idtoken');

    if (secretKey) {
      try {
        const decoded = jwtDecode.default(secretKey);
        setDecodedToken(decoded);

        axios.post('http://localhost:8080/api/v1/authenticate', decoded, {
          headers: {
            Authorization: `Bearer ${secretKey}`
          }
        })
        .then(response => {
          console.log('Backend response:', response.data);
        })
        .catch(error => {
          console.error('Error sending decoded token to backend:', error);
        });
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      console.error('Secret key not found in session storage');
    }
  }, []);

  return (
    <div>
      <h2>Decoded Token</h2>
      {decodedToken ? (
        <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
      ) : (
        <p>No token found or unable to decode.</p>
      )}
    </div>
  );
};

export default SendDecodedTokenToBackend;
