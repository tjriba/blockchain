import Web3 from 'web3';

let web3;

export const initializeWeb3 = async () => {
  if (window.ethereum) {
    // Si MetaMask est disponible, on l'utilise
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return web3;
    } catch (error) {
      throw new Error('User denied account access');
    }
  } else {
    // Sinon, on utilise Ganache via HTTP provider
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    web3 = new Web3(provider);
    return web3;
  }
};

export const getWeb3 = () => {
  if (!web3) throw new Error('Web3 not initialized');
  return web3;
};
