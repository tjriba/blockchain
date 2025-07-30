import { useState } from 'react';
import { initializeWeb3, getWeb3 } from '../utils/web3';
import Payment from '../contracts/Payment.json';

const contractAddress = '0x67eE11662db2930537A7Fc9Cd651dA537429feDD'; 

function Exercise8() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendPayment = async () => {
    try {
      setLoading(true);
      setError('');
      await initializeWeb3();
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(Payment.abi, contractAddress);

      await contract.methods.receivePayment().send({
        from: accounts[0],
        value: web3.utils.toWei(amount.toString(), 'ether')
      });

      alert('Payment sent successfully!');
    } catch (err) {
      setError('Error sending payment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const withdrawFunds = async () => {
    try {
      setLoading(true);
      setError('');
      await initializeWeb3();
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(Payment.abi, contractAddress);

      await contract.methods.withdraw().send({ from: accounts[0] });

      alert('Funds withdrawn successfully!');
    } catch (err) {
      setError('Error withdrawing funds: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="number" 
        placeholder="ETH Amount" 
        onChange={(e) => setAmount(e.target.value)} 
        disabled={loading}
      />
      <button onClick={sendPayment} disabled={loading || amount <= 0}>
        {loading ? 'Processing...' : 'Send ETH'}
      </button>
      <button onClick={withdrawFunds} disabled={loading}>
        {loading ? 'Processing...' : 'Withdraw Funds'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Exercise8;
