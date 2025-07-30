import { useState } from 'react';
import { getWeb3 } from '../utils/web3';
import { initializeWeb3 } from '../utils/web3';

import Calculations from '../contracts/Calculations.json';

export default function Exercise1() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const contractAddress = "0x3BB759c851cE02b6FcCB5A38305120bA3703757A";

  const calculateSum = async (isPure) => {
    try {
      const web3 = await initializeWeb3();

      const contract = new web3.eth.Contract(Calculations.abi, contractAddress);

      let res;
      if (isPure) {
        res = await contract.methods
          .addition2(parseInt(num1 || 0), parseInt(num2 || 0))
          .call();
      } else {
        res = await contract.methods.addition1().call();
      }

      setResult(res.toString());
      setError('');
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  return (
    <div className="exercise-container">
      <h2>Exercise 1: Simple Calculations</h2>
      
      {error && <p className="error">{error}</p>}
      
      <div className="input-group">
        <input
          type="number"
          placeholder="Number 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button onClick={() => calculateSum(false)}>
          View Sum (State)
        </button>
        <button onClick={() => calculateSum(true)}>
          Pure Sum (Params)
        </button>
      </div>

      {result && (
        <div className="result">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}