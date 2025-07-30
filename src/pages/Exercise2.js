import { useState } from 'react';
import { initializeWeb3, getWeb3 } from '../utils/web3';
import CurrencyConverter from '../contracts/CurrencyConverter.json';

// Adresse de ton contrat déployé sur Ganache (à adapter)
const contractAddress = "0x964E22881c77c3F4Bf9fA2f5b8018581E5e6F855";

export default function Exercise2() {
  const [etherAmount, setEtherAmount] = useState('');
  const [weiAmount, setWeiAmount] = useState('');
  const [conversionDirection, setConversionDirection] = useState('etherToWei');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    try {
      setLoading(true);
      setError('');
      setResult('');

      // Initialise web3 (MetaMask ou Ganache fallback)
      await initializeWeb3();
      const web3 = getWeb3();

      // Instancie le contrat
      const contract = new web3.eth.Contract(CurrencyConverter.abi, contractAddress);

      if (conversionDirection === 'etherToWei') {
        if (!etherAmount || isNaN(etherAmount)) {
          throw new Error('Please enter a valid Ether amount');
        }
        // Appel en lecture
        const wei = await contract.methods.etherEnWei(etherAmount).call();
        setResult(`${wei} wei`);
        setWeiAmount(wei);
      } else {
        if (!weiAmount || isNaN(weiAmount)) {
          throw new Error('Please enter a valid Wei amount');
        }
        const ether = await contract.methods.weiEnEther(weiAmount).call();
        setResult(`${ether} ether`);
        setEtherAmount(ether);
      }
    } catch (err) {
      console.error('Conversion error:', err);
      setError(err.message);
      setResult('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-container">
      <h2>Currency Converter</h2>

      <div className="conversion-controls">
        <select
          value={conversionDirection}
          onChange={(e) => {
            setConversionDirection(e.target.value);
            setResult('');
          }}
          disabled={loading}
        >
          <option value="etherToWei">Ether → Wei</option>
          <option value="weiToEther">Wei → Ether</option>
        </select>

        {conversionDirection === 'etherToWei' ? (
          <div className="input-group">
            <input
              type="number"
              placeholder="Enter Ether amount"
              value={etherAmount}
              onChange={(e) => setEtherAmount(e.target.value)}
              disabled={loading}
            />
          </div>
        ) : (
          <div className="input-group">
            <input
              type="number"
              placeholder="Enter Wei amount"
              value={weiAmount}
              onChange={(e) => setWeiAmount(e.target.value)}
              disabled={loading}
            />
          </div>
        )}

        <button onClick={convert} disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {result && <div className="result-display">Result: {result}</div>}
    </div>
  );
}
