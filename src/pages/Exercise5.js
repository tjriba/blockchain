import { useState } from 'react';
import { initializeWeb3, getWeb3 } from '../utils/web3';
import ParityCheck from '../contracts/ParityCheck.json';

// Adresse du contrat déployé (à adapter)
const contractAddress = '0x46b6b551a727F61AE7971c52DeDF60357bf2b63A';

function Exercise5() {
  const [number, setNumber] = useState('');
  const [isEven, setIsEven] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkParity = async () => {
    try {
      setLoading(true);
      setError('');
      setIsEven(null);

      // Initialisation web3 (MetaMask ou Ganache)
      await initializeWeb3();
      const web3 = getWeb3();

      const contract = new web3.eth.Contract(ParityCheck.abi, contractAddress);

      if (number === '' || isNaN(number)) {
        throw new Error('Please enter a valid number');
      }

      const result = await contract.methods.estPair(number).call();
      setIsEven(result);
    } catch (err) {
      console.error('Error checking parity:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Parity Check</h2>
      <input
        type="number"
        placeholder="Enter a number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        disabled={loading}
      />
      <button onClick={checkParity} disabled={loading}>
        {loading ? 'Checking...' : 'Check'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isEven !== null && !error && (
        <p>The number is {isEven ? 'even' : 'odd'}</p>
      )}
    </div>
  );
}

export default Exercise5;
