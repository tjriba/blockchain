import { useState } from 'react';
import { initializeWeb3, getWeb3 } from '../utils/web3';
import PositiveCheck from '../contracts/PositiveCheck.json';

function Exercise4() {
  const [number, setNumber] = useState('');
  const [isPositive, setIsPositive] = useState(null);
  const [error, setError] = useState('');

  const contractAddress = '0xAf68a89238bFC8686088A771Beb8e47A2387D96a'; 

  const checkPositivity = async () => {
    try {
      setError('');
      await initializeWeb3();
      const web3 = getWeb3();

      const contract = new web3.eth.Contract(
        PositiveCheck.abi,
        contractAddress
      );

      // Appel de la fonction pure ou view
      const result = await contract.methods.estPositif(number).call();

      setIsPositive(result);
    } catch (err) {
      setError(err.message);
      setIsPositive(null);
    }
  };

  return (
    <div>
      <h2>Positive Number Check</h2>
      <input 
        type="number" 
        placeholder="Enter a number" 
        onChange={(e) => setNumber(e.target.value)} 
      />
      <button onClick={checkPositivity}>Check</button>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {isPositive !== null && (
        <p>The number is {isPositive ? 'positive' : 'not positive'}</p>
      )}
    </div>
  );
}

export default Exercise4;
