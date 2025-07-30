import { useState } from 'react';
import { initializeWeb3, getWeb3 } from '../utils/web3';
import Rectangle from '../contracts/Rectangle.json';

const contractAddress = '0xDE9F243cC2E3465c20Cd0bfa9a37F00C6E78cd5A'; // adapte ici

function Exercise7() {
  const [rectangleInfo, setRectangleInfo] = useState({
    x: 0,
    y: 0,
    length: 10,
    width: 5,
  });
  const [surfaceArea, setSurfaceArea] = useState(0);
  const [coordinates, setCoordinates] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRectangleData = async () => {
    try {
      setLoading(true);
      setError('');

      await initializeWeb3();
      const web3 = getWeb3();

      const contract = new web3.eth.Contract(Rectangle.abi, contractAddress);

      const surface = await contract.methods.surface().call();
      const coords = await contract.methods.afficheXY().call();
      const dimensions = await contract.methods.afficheLoLa().call();

      setSurfaceArea(surface);
      setCoordinates(`X: ${coords[0]}, Y: ${coords[1]}`);
      setRectangleInfo((prev) => ({
        ...prev,
        length: dimensions[0],
        width: dimensions[1],
        x: coords[0],
        y: coords[1],
      }));

    } catch (err) {
      setError('Error loading rectangle data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Rectangle Manager</h2>
      <button onClick={getRectangleData} disabled={loading}>
        {loading ? 'Loading...' : 'Load Rectangle Data'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>Type: "Je suis Rectangle" (from contract)</p>
      <p>Coordinates: {coordinates}</p>
      <p>Length: {rectangleInfo.length}, Width: {rectangleInfo.width}</p>
      <p>Surface Area: {surfaceArea}</p>
    </div>
  );
}

export default Exercise7;
