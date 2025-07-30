import { useState, useEffect } from 'react';
import { initializeWeb3, getWeb3 } from '../utils/web3';
import NumberStorage from '../contracts/NumberStorage.json';

const contractAddress = '0x5ba0eebc6f9b465d12722c73C071420Cf52df57f'; // adapte ici

function Exercise6() {
  const [newNumber, setNewNumber] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [sum, setSum] = useState(0);
  const [indexToFetch, setIndexToFetch] = useState('');
  const [fetchedNumber, setFetchedNumber] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialisation web3 + contrat au montage
  useEffect(() => {
    const init = async () => {
      try {
        await initializeWeb3();
        const web3 = getWeb3();

        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          setError('No accounts available');
          return;
        }

        const contractInstance = new web3.eth.Contract(NumberStorage.abi, contractAddress);

        setAccount(accounts[0]);
        setContract(contractInstance);

        // Charger les données existantes
        await refreshData(contractInstance);
      } catch (err) {
        setError(err.message);
      }
    };

    init();
  }, []);

  // Fonction rafraîchir les données
  const refreshData = async (contractInstance = contract) => {
    if (!contractInstance) return;
    try {
      setLoading(true);
      const nums = await contractInstance.methods.afficheTableau().call();
      const total = await contractInstance.methods.calcularSomme().call();
      setNumbers(nums);
      setSum(total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error fetching data: ' + err.message);
    }
  };

  // Ajouter un nombre
  const addNumber = async () => {
    if (!contract || !account) return;
    if (newNumber === '' || isNaN(newNumber)) {
      setError('Please enter a valid number to add');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await contract.methods.ajouterNumber(newNumber).send({ from: account });
      setNewNumber('');
      await refreshData();
    } catch (err) {
      setError('Error adding number: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer un nombre par index
  const getNumber = async () => {
    if (!contract) return;
    if (indexToFetch === '' || isNaN(indexToFetch)) {
      setError('Please enter a valid index');
      return;
    }
    setError('');
    try {
      const num = await contract.methods.getElement(indexToFetch).call();
      setFetchedNumber(num);
    } catch (err) {
      setError('Invalid index or error: ' + err.message);
      setFetchedNumber(null);
    }
  };

  return (
    <div>
      <h2>Number Storage</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="number"
          placeholder="Add a number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          disabled={loading}
        />
        <button onClick={addNumber} disabled={loading}>
          Add
        </button>
      </div>

      <div>
        <input
          type="number"
          placeholder="Index to fetch"
          value={indexToFetch}
          onChange={(e) => setIndexToFetch(e.target.value)}
          disabled={loading}
        />
        <button onClick={getNumber} disabled={loading}>
          Get Number
        </button>
        {fetchedNumber !== null && <p>Number at index: {fetchedNumber}</p>}
      </div>

      <button onClick={() => refreshData()} disabled={loading}>
        Refresh Data
      </button>

      <p>Using account: {account}</p>
      <p>All Numbers: {numbers.join(', ')}</p>
      <p>Total Sum: {sum}</p>
    </div>
  );
}

export default Exercise6;
