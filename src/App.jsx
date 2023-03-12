import { useState, useEffect } from 'react';
import Counter from './contracts/Counter.sol/Counter.json';
import { ethers } from 'ethers';
import './global.css';

const counterAddress = '0x9513cB7DF4E87c8aA4b832395e1111f99218ca04';
console.log(counterAddress, 'Counter ABI: ', Counter.abi);

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const incrementCounter = async () => {
    await updateCounter();
  };

  async function updateCounter() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(counterAddress, Counter.abi, signer);
      const transaction = await contract.increment();
      setIsLoading(true);
      await transaction.wait();
      setIsLoading(false);
      readCounterValue();
    }
  }

  useEffect(() => {
    // declare the data fetching function
    const fetchCount = async () => {
      const data = await readCounterValue();
      return data;
    };

    fetchCount().catch(console.error);
  }, []);

  async function readCounterValue() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('provider', provider);
      const contract = new ethers.Contract(
        counterAddress,
        Counter.abi,
        provider
      );
      console.log('contract', contract);
      try {
        const data = await contract.retrieve();
        console.log(data);
        console.log('data: ', parseInt(data.toString()));
        setCount(parseInt(data.toString()));
      } catch (err) {
        console.log('Error: ', err);
        alert(
          'Switch your MetaMask network to Polygon zkEVM testnet and refresh this page!'
        );
      }
    }
  }

  return (
    <div className='hello'>
      <button
        class='connect-button shadow'
        onClick={incrementCounter}
        disabled={isLoading}
      >
        <p>Count: {count}</p>
        <span id='"connect'>Counter button </span>
        {isLoading ? 'loading...' : '+1'}
      </button>
    </div>
  );
}

export default App;
