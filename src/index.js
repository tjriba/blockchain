import { createRoot } from 'react-dom/client';
import App from './App';
import Web3 from 'web3';

// Initialize Web3
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
}

createRoot(document.getElementById('root')).render(<App />);