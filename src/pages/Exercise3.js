import { useState, useEffect } from 'react';
import { initializeWeb3, getWeb3 } from '../utils/web3';
import GestionChaines from '../contracts/GestionChaines.json';

function Exercise3() {
  const [message, setMessage] = useState('');
  const [concatResult, setConcatResult] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        await initializeWeb3();
        const web3 = getWeb3();

        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          setError('No accounts found');
          return;
        }

        const contractAddress = '0x663e513F4B28308487d19A2E9ab5fc45A9739257'; 
        const contractInstance = new web3.eth.Contract(GestionChaines.abi, contractAddress);

        setAccount(accounts[0]);
        setContract(contractInstance);
      } catch (err) {
        setError(err.message);
      }
    };

    init();
  }, []);

  const updateMessage = async () => {
    if (!contract || !account) return;

    try {
      await contract.methods.setMessage(message).send({ from: account });
      alert('Message updated!');
    } catch (err) {
      alert('Transaction failed: ' + err.message);
    }
  };

  const getMessage = async () => {
    if (!contract) return;

    try {
      const res = await contract.methods.getMessage().call();
      setConcatResult(res);
    } catch (err) {
      setError('Failed to get message: ' + err.message);
    }
  };

  return (
    <div>
      <input
        placeholder="Set message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={updateMessage}>Update</button>

      <button onClick={getMessage}>Get Message</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Current Message: {concatResult}</p>
      <p>Using account: {account}</p>
    </div>
  );
}

export default Exercise3;
