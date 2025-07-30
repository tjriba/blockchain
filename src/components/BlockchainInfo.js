import { useState, useEffect } from 'react';
import { initializeWeb3, getWeb3 } from '../utils/web3';

function BlockchainInfo() {
  const [account, setAccount] = useState('Connecting...');
  const [blockNumber, setBlockNumber] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        await initializeWeb3();
        const web3 = getWeb3();

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0] || 'No account selected');

        const currentBlock = await web3.eth.getBlockNumber();
        setBlockNumber(currentBlock);

        // Si window.ethereum existe (MetaMask), on peut écouter les changements de compte
        if (window.ethereum && window.ethereum.on) {
          const handleAccountsChanged = (newAccounts) => {
            setAccount(newAccounts[0] || 'No account selected');
          };

          window.ethereum.on('accountsChanged', handleAccountsChanged);

          // Nettoyage à la désinstallation du composant
          return () => {
            if (window.ethereum.removeListener) {
              window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
          };
        }
      } catch (err) {
        setError(err.message);
        setAccount('Connection failed');
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div className="blockchain-info">
      {error ? (
        <div className="error">
          <p>⚠️ {error}</p>
          <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">
            🦊 Install MetaMask
          </a>
        </div>
      ) : (
        <>
          <div className="blockchain-stat">
            <span className="stat-label">👤 Account:</span>
            <span className="stat-value">{account}</span>
          </div>
          <div className="blockchain-stat">
            <span className="stat-label">🔗 Block:</span>
            <span className="stat-value">{blockNumber}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default BlockchainInfo;
