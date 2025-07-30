// src/components/ConnectButton.js
import { useState } from 'react';
import { initializeWeb3 } from '../utils/web3';

export default function ConnectButton() {
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      await initializeWeb3();
      setIsConnected(true);
      setError('');
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    }
  };

  return (
    <div className="connect-wallet">
      {error && <p className="error">{error}</p>}
      <button onClick={connectWallet} disabled={isConnected}>
        {isConnected ? 'Connected' : 'Connect MetaMask'}
      </button>
    </div>
  );
}